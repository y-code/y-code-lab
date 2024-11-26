import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NuGetInfo, ProjectInfo } from '../model/my-projects.model';

const data: readonly Readonly<ProjectInfo>[] = [
  {
    id: "sniffy",
    name: "Sniffy - PCAP Sandbox",
    category: "AppDev",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/pcap-sample",
    languages: [ "C++", "CMake", "Java", ".NET C#", "TypeScript", "Sass", "PLpgSQL", "Protobuf", "Dockerfile", "Docker Compose" ],
    tags: [ "PCAP", "Apache AGE", "PostgreSQL", "Kafka", "Kafka Connect", "Three.js" ],
    description: [
      "Sniffy is my sandbox project to play with the PCAP library and try analysing network traffic to derive insight or anomalies.",
      "A C++ program, Sniffy, monitors a network interface and gathers the network packets that go through it. Another C++ program aggregates data by time and some fields, serialises it using Protobuf, and sends it to Kafka. A custom Kafka Sink consumes the Kafka topic and stores it in the PostgreSQL database.",
      "By running Sniffy in the network gateway, we can gather the network traffic thoroughly. As it collects in the central database via Kafka, Sniffy can be deployed and run on subnetwork gateways to distribute the traffic monitoring load. However, adjustment for traffic overlap still needs to be implemented for the nested subnetwork case.",
      "To begin the network traffic analysis, I aggregated the communications by PLpgSQL and Apache AGE to form a graph of the relationships between network nodes by the network protocol. I visualised the graph data in a force-directed iterative layout to help derive insights into the network.",
      "I plan on extending this sandbox to experiment with machine learning algorithms, which may detect complex network anomalies.",
    ],
    links: {
      "force-directed iterative layout": "https://github.com/vasturiano/3d-force-graph",
    },
    routerLinks: {},
    video: "https://www.youtube.com/embed/aUK6dQsG94A",
  },
  {
    id: "ycode-lab",
    name: "Y-code Lab",
    category: "AppDev",
    logo: "/assets/favicon-32.png",
    logoAlt: "logo image",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/y-code-lab",
    languages: [ ".NET C#", "TypeScript", "Sass" ],
    tags: [ "ASP.NET Core", "React", "Redux" ],
    description: [
      "Y-code Lab is my profile website here. I'm using ASP.Net Core SPA with React/Redux and Entity Framework with PostgreSQL for this web application development. I dockerize it and am hosting the docker container at Heroku.",
      "The source code of this web application is in public in y-code/y-code-lab repository at GitHub. Please feel free to look over it.",
    ],
    links: {
      "y-code/y-code-lab repository at GitHub": "https://github.com/y-code/y-code-lab",
    },
    routerLinks: {
      "Technical Writings page": "/tech-writings",
    },
  },
  {
    id: "happyfl",
    name: "HappyFL",
    category: "AppDev",
    logo: "https://github.com/y-code/happyfl/raw/master/HappyFL/wwwroot/favicon.png",
    logoAlt: "logo image",
    languages: [ ".NET C#", "TypeScript" ],
    tags: [ "ASP.NET Core", "Angular", "NgRx" ],
    description: [
      "HappyFL is a web application I'm personally developing. I'm using ASP.Net Core SPA with Angular and Entity Framework with PostgreSQL for this web application development.",
      "This web application is a daily food management system, which integrates meal planning, shopping list generation, and recipe management. The development is still at the beginning, and what you can do so far is to parse recipe webpages, to save the parsed recipe information, and to view the saved recipes (dishes).",
      "By the way, I enhanced Npgsql to host it at App Harbor, and I currently have a pull request for the changes at Npgsql GitHub repository. Please find the details of the enhancement in Contributions in Third-Party Software page or my pull request at GitHub.",
    ],
    links: {
      "my pull request at GitHub": "https://github.com/npgsql/npgsql/pull/2733",
    },
    routerLinks: {
      "Contributions in Third-Party Software page": "/contributions-in-3rd-party#npgsql-enhancement",
    },
    video: "https://www.youtube.com/embed/rzlIH8FfK6E",
  },
  {
    id: "aspnet-api-group-versioning",
    name: "ASP.NET API Group Versioning",
    category: "LibDev",
    logo: "https://github.com/y-code/aspnet-api-group-versioning/raw/master/doc/images/icon.png",
    logoAlt: "logo image",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/aspnet-api-group-versioning",
    languages: [ ".NET C#" ],
    tags: [ "ASP.NET", "Web API", "API Versioning" ],
    description: [
      "When we have a web API and are versioning the entire API in each version, we need to bump up version number even when releasing changes only for a few endpoints while all the others are the same. It was not enjoyable while I'm providing an API in my work. I needed to have a quite amount of code for versioning regardless the endpoints have feature changes or not. Besides, it was ambiguous which endpoints contain changes, where only documentation can tell it to users.",
      "When it comes to agile software development, and as the API grows in the number of endpoints, it became a more severe problem. Then, I came up with an idea to make use of API group version to resolve this issue.",
      "Unfortunately, ASP.NET API Versioning does not allow to use API group version in that way. Therefore, I published this package to extends the versioning functionality.",
    ],
    links: {
    },
    routerLinks: {
    },
    nugetPackage: "Ycode.AspNetCore.Mvc.GroupVersioning",
    image: "https://github.com/y-code/aspnet-api-group-versioning/raw/master/doc/images/group_versioning.png",
  },
  {
    id: "template-rest-api",
    name: "ASP.NET Core Web API Template with API Documentation",
    category: "LibDev",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/template-rest-api",
    languages: [ ".NET C#" ],
    tags: [ "ASP.NET", "Web API", "Swagger", "OpenAPI" ],
    description: [
      "This NuGet package is a C# project template for the .NET Core Template Engine. During writing test code for ASP.NET API Group Versioning package, I tried my code in many web API projects with a variety of configurations. To make it easy, I created this project template to create a base of web API project quickly.",
    ],
    links: {
    },
    routerLinks: {
    },
    nugetPackage: "Ycode.RestApi",
  },
  {
    id: "testrail-client-for-test-code",
    name: "TestRail Client for Test Code",
    category: "LibDev",
    logo: "https://github.com/y-code/testrail-client-for-test-code/raw/master/src/TestRailClient.V2/Images/icon.png",
    logoAlt: "logo image",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/template-rest-api",
    languages: [ ".NET C#" ],
    tags: [ "NUnit", "Testing Library" ],
    description: [
      "Ycode.TestRailClient.V2 provides a TestRail API v2 client that implements the functionalities typically required to integrate your test code with TestRail.",
    ],
    links: {
    },
    routerLinks: {
    },
    nugetPackage: "Ycode.TestRailClient.V2",
  },
  {
    id: "testrail-client-for-nunit-test-code",
    name: "TestRail Client for NUnit Test Code",
    category: "LibDev",
    logo: "https://github.com/y-code/testrail-client-for-test-code/raw/master/src/TestRailClient.V2.NUnit/Images/icon.png",
    logoAlt: "logo image",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/testrail-client-for-test-code",
    languages: [ ".NET C#" ],
    tags: [ "NUnit", "Testing Library" ],
    description: [
      "Ycode.TestRailClient.V2.NUnit extends Ycode.TestRailClient.V2 to make it easy to use in NUnit code.",
    ],
    links: {
    },
    routerLinks: {
    },
    nugetPackage: "Ycode.TestRailClient.V2.NUnit",
  },
  {
    id: "uri-convert",
    name: "URI Convert",
    category: "LibDev",
    logo: "https://github.com/y-code/uri-convert/raw/master/doc/images/icon.png",
    logoAlt: "logo image",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/testrail-client-for-test-code",
    languages: [ ".NET C#" ],
    tags: [ "Component Model" ],
    description: [
      "Ycode.Uri is a utility library for serializing POCO to URI string or Uri instance. It helps to generate URI dynamically with a simple code. For example, when you call other web API in a back-end system, you need to modify the request URL depending on conditions. If you use this library, you can have all the data that required to compose the URL in a model class and can generate a URL from it. It is just like Json.NET allow to convert an object into a JSON string.",
    ],
    links: {
    },
    routerLinks: {
    },
    nugetPackage: "Y-code.UriConvert",
  },
  {
    id: "react-redux-stethoscope",
    name: "React-Redux Stethoscope",
    category: "LibDev",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/react-redux-stethoscope",
    languages: [ "TypeScript" ],
    tags: [ "React", "Redux", "Testing Library" ],
    description: [
      "When you want to test a React component after an operation that dispatches a Redux action, you need to make it sure that before your test code goes on, all the React components connected to the Redux store are thoroughly updated based on the new state. We can easily assure it with act() provided by React Test Utility or Testing Library for React. However, it cannot help when a test target operation dispatches Redux actions asynchronously.",
      "That's where React-Redux Stethoscope comes to help you. It can target specific Redux actions, and run test code after each action entirely takes effect on all the React components. Test code becomes like below.",
      "Please find more details at npmjs.com",
    ],
    codeSample: `await stethoscope.listenAsync({
  act: () => {
    wrapper.getAllByText('↺')[0].click()
  },
  targets: [
    {
      actionType: actionCreators.requestMessages().type,
      onUpdated: () => {
        expect(wrapper.queryAllByText('Loading...')).toHaveLength(1)
      }
    },
    {
      actionType: actionCreators.receiveMessages({}).type,
      onUpdated: () => {
        expect(wrapper.queryByText('Loading...')).toBeNull()
        expect(wrapper.queryAllByText('Hello, World')).toHaveLength(1)
      }
    },
  ]
})`,
    links: {
      "React Test Utility": "https://reactjs.org/docs/test-utils.html#act",
      "Testing Library for React": "https://testing-library.com/docs/react-testing-library/api#act",
      "npmjs.com": "https://www.npmjs.com/package/react-redux-stethoscope",
    },
    routerLinks: {
    },
    npmBadge: "react-redux-stethoscope",
  },
  {
    id: "reactstrap-paginationbar",
    name: "Reactstrap Paginationbar",
    category: "LibDev",
    subLogo: "/assets/GitHub-Mark-64px.png",
    subLogoLink: "https://github.com/y-code/reactstrap-paginationbar",
    languages: [ "JavaScript" ],
    tags: [ "React", "Bootstrap" ],
    description: [
      "When I was developing a support tool using React at my work, I found that implementing pagination with the component of Bootstrap requires a particular effort. Unfortunately, there's no difference with Reactstrap either. So, I developed a higher level of pagination component for Reactstrap and published it as an npm package.",
      "This component assembles Reactstrap's stateless pagination components and provides stateful pagination functionality. Import the component and place it in code, then you will instantly see a pagination bar on UI.",
    ],
    links: {
    },
    routerLinks: {
    },
    npmBadge: "reactstrap-paginationbar",
    codeSandbox: "https://codesandbox.io/embed/p3yjn7rpv0?fontsize=14&amp;hidenavigation=1&amp;theme=dark",
  },
];

interface NuGetInfoState {
  isLoading: boolean,
  data?: Readonly<NuGetInfo>,
}

interface ProjectState {
  data: Readonly<ProjectInfo>,
  nugetInfo: NuGetInfoState,
}

interface ProjectsState {
  isLoading: boolean,
  data?: Record<string, ProjectState>,
}

export interface MyProjectsState {
  projects: ProjectsState,
}

export const initialState: MyProjectsState = {
  projects: {
    isLoading: false,
  },
} as const;

export const requestProjectsAsync = createAsyncThunk(
  'MyProjects/requestProjectsAsync',
  async (_: object, { dispatch }) => {
    for (const project of data) {
      if (project.nugetPackage)
        // intentionally not awaiting
        dispatch(requestNuGetInfoAsync({id: project.id, nugetPackage: project.nugetPackage}));
    }
    return {data};
  }
);

export const requestNuGetInfoAsync = createAsyncThunk(
  'MyProjects/requestNuGetInfoAsync',
  async ({ nugetPackage }: {id: string, nugetPackage: string}) => {
    const response = await fetch(`https://api.nuget.org/v3-flatcontainer/${nugetPackage}/index.json`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data: NuGetInfo = await response.json();
    return {data};
  }
)

const myProjectsSlice = createSlice({
  name: 'my-projects',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(requestProjectsAsync.pending, state => {
      state.projects = {
        isLoading: true,
      };
    })
    .addCase(requestProjectsAsync.fulfilled, (state, action) => {
      state.projects = {
        ...state.projects,
        isLoading: false,
      };
      state.projects.data = {...state.projects.data};
      for (const project of action.payload.data) {
        state.projects.data[project.id] = {
          ...state.projects.data[project.id],
          data: project,
        };
      }
    })
    .addCase(requestNuGetInfoAsync.pending, (state, action) => {
      state.projects.data = {...state.projects.data};
      state.projects.data[action.meta.arg.id] = {
        ...state.projects.data[action.meta.arg.id],
        nugetInfo: {
          isLoading: true,
        },
      };
    })
    .addCase(requestNuGetInfoAsync.fulfilled, (state, action) => {
      state.projects.data = {...state.projects.data};
      state.projects.data[action.meta.arg.id].nugetInfo = {
        ...state.projects.data[action.meta.arg.id].nugetInfo,
        isLoading: false,
        data: action.payload.data,
      };
    }),
});

export default myProjectsSlice;
export const { actions } = myProjectsSlice;
