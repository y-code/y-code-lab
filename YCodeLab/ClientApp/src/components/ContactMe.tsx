import React, { ReactElement, Dispatch, SetStateAction, useCallback } from 'react';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { Message, actionCreators, SaveMessageState, MessagingState } from '../store/Messaging';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

import './ContactMe.scss';
import { RoutingProps } from '../App';

interface Props extends RoutingProps {
}

class ContactMeState {
  content: string = "";
}

export default class ContactMe extends React.PureComponent<Props, ContactMeState> {
  constructor(props: Props) {
    super(props);
    this.state = new ContactMeState();
  }

  public render() {
    return (
      <ConnectedContactMeForm/>
    );
  }
}

var lastSaveMessageStateId = 0;

let ContactMeForm: React.FunctionComponent<{
} | typeof actionCreators | MessagingState> = (props) => {
  const [ senderName, setSenderName ] = React.useState("");
  const [ senderEmail, setSenderEmail ] = React.useState("");
  const [ content, setContent ] = React.useState("");
  const [ isSenderNameValid, setIsSenderNameValid ] = React.useState(undefined as boolean | undefined);
  const [ isSnderEmailValid, setIsSenderEmailValid ] = React.useState(undefined as boolean | undefined);
  const [ isContentValid, setIsContentValid ] = React.useState(undefined as boolean | undefined);
  const [ isAllValid, setIsAllValid ] = React.useState(false);

  const {
    requestSaveMessage
  } = props as typeof actionCreators;
  const {
    saveMessage
  } = props as MessagingState;

  React.useEffect(() => {
    if (saveMessage) {
      let result = saveMessage.result;
      if (result && result.errors) {
        setIsSenderNameValid(!result.errors.senderName);
        setIsSenderEmailValid(!result.errors.senderEmail);
        setIsContentValid(!result.errors.content);
  
        setIsAllValid(
          isSenderNameValid as boolean
          && isSnderEmailValid as boolean
          && isContentValid as boolean);
      } else {
        setIsAllValid(true);
      }
    }
  });

  const instantValidation = React.useMemo(() => {
    if (!saveMessage || !saveMessage.result)
      return;
    if (requestSaveMessage) {
      requestSaveMessage({
        senderName,
        senderEmail,
        content
      },
      false);
    }
  }, [ senderName, senderEmail, content ]);

  const contentLength = React.useMemo(() => content.length, [ content ]);

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();

    if (requestSaveMessage)
      requestSaveMessage({
        senderName,
        senderEmail,
        content
      },
      true);
  }

  let feedbackForSenderName: ReactElement[] = [];
  let feedbackForSenderEmail: ReactElement[] = [];
  let feedbackForContent: ReactElement[] = [];
  let feedbackKey = 0;
  if (saveMessage && saveMessage.result && saveMessage.result.errors) {
    if (saveMessage.result.errors.senderName) {
      for (let error of saveMessage.result.errors.senderName.errors) {
        feedbackForSenderName.push(
          <div key={feedbackKey++}>{error.errorMessage}</div>
        )
      }
    }
    if (saveMessage.result.errors.senderEmail) {
      for (let error of saveMessage.result.errors.senderEmail.errors) {
        feedbackForSenderEmail.push(
          <div key={feedbackKey++}>{error.errorMessage}</div>
        )
      }
    }
    if (saveMessage.result.errors.content) {
      for (let error of saveMessage.result.errors.content.errors) {
        feedbackForContent.push(
          <div key={feedbackKey++}>{error.errorMessage}</div>
        )
      }
    }
  }

  if (saveMessage && saveMessage.result && saveMessage.result.message) {
    return (
      <div className="contact-me-page">
        <div className="page-section">
          <Container>
            <div className={`${saveMessage.result.status == "Success" ? "text-info" : "text-danger"}`}>
              {saveMessage.result.message}
            </div>
          </Container>
        </div>
      </div>
    );
  } else {
    return (
      <div className="contact-me-page">
        <div className="page-section">
          <h1 className="site-category-name">Contact ME</h1>
          <Container>
            <Form>
              <FormGroup>
                <Label for="senderName">Your Name</Label>
                <Input
                  id="senderName"
                  type="text"
                  value={senderName}
                  className={appendIsValidClass("", isSenderNameValid, isAllValid)}
                  onChange={e => setSenderName(e.currentTarget.value)} />
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div className="invalid-feedback">
                  {feedbackForSenderName}
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="senderEmail">Your Email</Label>
                <Input
                  id="senderEmail"
                  type="text"
                  value={senderEmail}
                  className={appendIsValidClass("", isSnderEmailValid, isAllValid)}
                  onChange={e => setSenderEmail(e.currentTarget.value)}/>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div className="invalid-feedback">
                  {feedbackForSenderEmail}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="container-fluid">
                  <div className="row justify-content-between">
                    <Label for="content">Message</Label>
                    <div
                      className={isContentValid === undefined ? "text-info" : (isContentValid || isAllValid) ? "text-success" : "text-danger"}>
                      {contentLength} / 1,000
                    </div>
                  </div>
                </div>
                <textarea
                  id="content"
                  className={appendIsValidClass("form-control", isContentValid, isAllValid)}
                  value={content}
                  onChange={e => setContent(e.currentTarget.value)}/>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div className="invalid-feedback">
                  {feedbackForContent}
                </div>
              </FormGroup>
              <FormGroup>
                <Button
                  id="sendButton"
                  type="button"
                  className="form-control"
                  color="primary"
                  disabled={!isAllValid}
                  onClick={e => handleSubmit(e)}>
                  Send
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </div>
      </div>
    );
  }

}

function appendIsValidClass(classNames: string, flag: boolean | undefined, totalFlag: boolean) {
  if (flag === undefined)
    return classNames;
  if (totalFlag)
    return classNames + " is-valid";
  return (classNames ? classNames + " " : classNames) + (flag ? "is-valid" : "is-invalid");
}

let ConnectedContactMeForm = connect(
  (state: ApplicationState) => state.messaging,
  actionCreators
)(ContactMeForm as any)
