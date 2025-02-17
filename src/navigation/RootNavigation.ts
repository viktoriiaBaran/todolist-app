/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.warn('Navigation not ready');
  }
}

export function replace(args: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.replace(args));
  } else {
    console.warn('Navigation not ready');
  }
}

export function reset(args: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.reset(args);
  } else {
    console.warn('Navigation not ready');
  }
}

export function push(args: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(args));
  } else {
    console.warn('Navigation not ready');
  }
}
