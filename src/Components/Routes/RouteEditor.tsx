/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PROCESS_TYPE } from '../../Shared/constants';
import { ACTION_TYPES } from '../../Shared/actionTypes';
import { RouteDetails, RouteEditorProps } from '../../interfaces';
import { processRouteData } from '../../Utils/ProcessData';
import {
  patchCurrentRouteData,
  postCurrentRouteData,
} from '../../Actions/routeActions';
import Editor from '../Features/Editor';

const RouteEditor = ({
  content,
  textFields,
  param,
}: RouteEditorProps): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch();

  content = processRouteData(content, PROCESS_TYPE.PRE_PROCESS, dispatch);

  const { currentRouteData } = useSelector((state: any) => state.routeReducer);

  const [formData, setFormData] = React.useState<RouteDetails>(content);

  const handleOnCancel = (): void => {
    setFormData(currentRouteData);
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_ROUTE_DATA,
      payload: currentRouteData,
    });
  };

  const toggleValues = {
    strip_path: formData.strip_path,
    preserve_host: formData.preserve_host,
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const request: RouteDetails = processRouteData(
      formData,
      PROCESS_TYPE.POST_PROCESS,
      dispatch
    );
    if (param) {
      dispatch(patchCurrentRouteData(request, id as string));
    } else {
      request.service = {
        id,
      };
      dispatch(postCurrentRouteData(request));
    }
  };

  return (
    <Editor
      content={content}
      textFields={textFields}
      handleOnCancel={handleOnCancel}
      handleOnSubmit={handleOnSubmit}
      formData={formData}
      setFormData={setFormData}
      requiredCancel
      submitText="Submit"
    />
  );
};

export default RouteEditor;
