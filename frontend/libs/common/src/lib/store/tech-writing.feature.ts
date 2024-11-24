import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TechWritingInfo } from '../model/tech-writing.model';

const data: readonly Readonly<TechWritingInfo>[] = [
  {
    url: "https://www.codeproject.com/Articles/5385400/Cplusplus-CMake-Build-Issue-with-SQLite3-Fixed-Usi",
    title: "C++ CMake build issue with SQLite3 fixed using pkg-config utility",
    summary: "When I ran into a problem with `find_package( SQLite3 REQUIRED )`, I dug into the fix and played with the pkg-config utility.",
    rating: 5,
    votes: 4,
    views: 1770,
    publishedDate: "14 July 2024",
  },
  {
    url: "https://www.codeproject.com/Articles/5384546/Factory-Design-Pattern-in-Cplusplus",
    title: "Factory Design Pattern in C++",
    summary: "Factory design pattern is one of the common design patterns seen in code. It is a simple structure, but it can be written a variety of ways in C++, with the conceptual intentions behind it. Let us see several solutions and consider their potential.",
    rating: 5,
    votes: 4,
    views: 1770,
    publishedDate: "30 June 2024",
  },
  {
    url: "https://www.codeproject.com/Tips/5249190/JsonConverter-Attribute-in-ASP-NET-Core-3-0-Web-AP",
    title: "JsonConverter Attribute in ASP.NET Core 3.0 Web API",
    summary: "ASP.NET Core 3.0 uses a built-in JSON converter from System.Text.Json so that JsonConverter attribute from Newtonsoft.Json does not work by default.",
    rating: 5,
    votes: 4,
    views: 1770,
    publishedDate: "23 Oct 2019",
  },
  {
    url: "https://www.codeproject.com/Tips/1271126/Build-Issue-with-Ruby-in-macOS-Bundler-Installatio",
    title: "Build Issue with Ruby in macOS --- Bundler Installation and Bootstrap `docs` Script Run",
    summary: "Tutorial about how to add authentication functionalities to your existing ASP.NET Core project using Microsoft.AspNetCore.Identity.UI package.",
    rating: 0,
    votes: 0,
    views: 1260,
    publishedDate: "11 Dec 2018",
  },
  {
    url: "https://www.codeproject.com/Articles/1265638/ASP-NET-Core-Authentication-UI-Installation",
    title: "ASP.NET Core - Authentication UI Installation",
    summary: "Tutorial about how to add authentication functionalities to your existing ASP.NET Core project using Microsoft.AspNetCore.Identity.UI package.",
    rating: 5,
    votes: 4,
    views: 9951,
    publishedDate: "10 Nov 2018",
  },
  {
    url: "https://www.codeproject.com/Tips/5249190/JsonConverter-Attribute-in-ASP-NET-Core-3-0-Web-AP",
    title: "Utilities for Enumeration Field Attribute",
    summary: "Enumeration fields typically require a mapping to human-friendly names and/or code when we display it on UI or output to some persistence. This utility code in this article helps to code such mapping inside enumeration declaration by an attributes.",
    rating: 2,
    votes: 4,
    views: 5250,
    publishedDate: "12 Jul 2018",
  },
];

interface WritingsState {
  isLoading: boolean,
  data?: readonly Readonly<TechWritingInfo>[],
}

export interface TechWritingState {
  writings: WritingsState,
}

export const initialState: TechWritingState = {
  writings: {
    isLoading: false,
  },
} as const;

export const requestTechWritingsAsync = createAsyncThunk(
  'TechWritings/requestTechWritingsAsync',
  async () => ({data})
);

const techWritingSlice = createSlice({
  name: 'tech-writings',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(requestTechWritingsAsync.pending, state => {
      state.writings = {
        isLoading: true,
      };
    })
    .addCase(requestTechWritingsAsync.fulfilled, (state, action) => {
      state.writings = {
        ...state.writings,
        isLoading: false,
        data: [...action.payload.data],
      };
    }),
});

export default techWritingSlice;
export const { actions } = techWritingSlice;
