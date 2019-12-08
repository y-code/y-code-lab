import React, { ReactElement, Dispatch, SetStateAction, useCallback } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Message, actionCreators, SaveMessageState, MessagingState } from '../store/Messaging';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

import './ContactMe.scss';

interface ContactMeProperties {
}

class ContactMeState {
  content: string = "";
}

export default class ContactMe extends React.PureComponent<ContactMeProperties & typeof actionCreators, ContactMeState> {
  constructor(props: ContactMeProperties & typeof actionCreators) {
    super(props);
    this.state = new ContactMeState();
  }

  public render() {
    return (
      <ContactMeForm/>
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

  React.useEffect(() => {
    console.log(`[DEBUG] Effect is being executed. Loading state: ${(props as MessagingState).saveMessage.isLoading}`);

    let result = (props as MessagingState).saveMessage.result;
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
  });

  const instantValidation = React.useMemo(() => {
    console.log(`[DEBUG] A field was updated`);
    if (!((props) as MessagingState).saveMessage.result)
      return;
    if ((props as typeof actionCreators).requestSaveMessage) {
      (props as typeof actionCreators).requestSaveMessage({
        senderName,
        senderEmail,
        content
      });
    }
  }, [ senderName, senderEmail, content ]);

  const contentLength = React.useMemo(() => content.length, [ content ]);

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    if ((props as typeof actionCreators).requestSaveMessage)
      (props as typeof actionCreators).requestSaveMessage({
        senderName,
        senderEmail,
        content
      });
  }

  let feedbackForSenderName: ReactElement[] = [];
  let feedbackForSenderEmail: ReactElement[] = [];
  let feedbackForContent: ReactElement[] = [];
  let feedbackKey = 0;
  if ((props as MessagingState).saveMessage.result
    && (props as MessagingState).saveMessage.result.errors) {
    if ((props as MessagingState).saveMessage.result.errors.senderName) {
      for (let error of (props as MessagingState).saveMessage.result.errors.senderName.errors) {
        feedbackForSenderName.push(
          <div key={feedbackKey++}>{error.errorMessage}</div>
        )
      }
    }
    if ((props as MessagingState).saveMessage.result.errors.senderEmail) {
      for (let error of (props as MessagingState).saveMessage.result.errors.senderEmail.errors) {
        feedbackForSenderEmail.push(
          <div key={feedbackKey++}>{error.errorMessage}</div>
        )
      }
    }
    if ((props as MessagingState).saveMessage.result.errors.content) {
      for (let error of (props as MessagingState).saveMessage.result.errors.content.errors) {
        feedbackForContent.push(
          <div key={feedbackKey++}>{error.errorMessage}</div>
        )
      }
    }
  }

  if ((props as MessagingState).saveMessage.result
    && (props as MessagingState).saveMessage.result.message) {
    return (
      <div className="main-content-message">
        <div className={`${(props as MessagingState).saveMessage.result.status == "Success" ? "text-info" : "text-danger"}`}>
          {(props as MessagingState).saveMessage.result.message}
        </div>
      </div>
    );
  } else {
    return (
      <div className="contact-me-page">
        <h1 className="site-category-name">Contact ME</h1>
        <Form>
          <FormGroup>
            <Label for="senderName">Your Name</Label>
            <Input
              id="senderName"
              type="text"
              value={senderName}
              className={appendIsValidClass("", isSenderNameValid, isAllValid)}
              onChange={e => setSenderName(e.currentTarget.value)}/>
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
                  className={isContentValid === undefined ? "text-info" : isContentValid ? "text-success" : "text-danger"}>
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
              type="button"
              className="form-control"
              color="primary"
              disabled={!isAllValid}
              onClick={handleSubmit}>
              Send
            </Button>
          </FormGroup>
        </Form>
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

ContactMeForm = connect(
  (state: ApplicationState) => state.messaging,
  actionCreators
)(ContactMeForm as any)
