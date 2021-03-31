import * as React from 'react';
import { CommonActions } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
