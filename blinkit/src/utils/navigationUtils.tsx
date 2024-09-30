import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (routeName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
};
export const replace = (routeName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
};
export const resetAndNavigate = (routeName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
};

export const push = (routeName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
};
