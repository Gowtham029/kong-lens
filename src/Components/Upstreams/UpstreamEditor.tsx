/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PROCESS_TYPE } from '../../Shared/constants';
import { ACTION_TYPES } from '../../Shared/actionTypes';
import { ServiceDetails, ServiceEditorProps } from '../../interfaces';
import { patchCurrentServiceData } from '../../Actions/serviceActions';
import { processServiceData } from '../../Utils/ProcessData';
import { postCurrentUpstreamData } from '../../Actions/upstreamActions';
import Editor from '../Features/Editor';

const UpstreamEditor = ({
  content,
  textFields,
}: ServiceEditorProps): JSX.Element => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const param = query.get('newId') === 'true';
  const loadingData = useSelector((state: any) => state.loadingData);

  const { currentUpstreamData } = useSelector(
    (state: any) => state.upstreamReducer
  );

  const [formData, setFormData] = React.useState(content);

  const dispatch = useDispatch();

  const handleOnCancel = (): void => {
    setFormData(currentUpstreamData);
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_UPSTREAMS_DATA,
      payload: currentUpstreamData,
    });
  };

  const handleOnChange = (e: {
    preventDefault: any;
    target: { name: any; type: any; value: any };
  }): void => {
    e.preventDefault;
    const { name, type, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'number'
          ? parseInt(value === undefined ? 0 : value, 10)
          : value,
    });
  };

  const handleListChange = (
    key: keyof ServiceDetails,
    value: string[]
  ): void => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (param) {
      const request = formData;
      dispatch(postCurrentUpstreamData(request, navigate));
    } else {
      const request: ServiceDetails = processServiceData(
        formData,
        PROCESS_TYPE.POST_PROCESS
      );
      dispatch(patchCurrentServiceData(request, id as string));
    }
  };

  return (
    <>
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
      {/* <AccordionGroup>
        <Accordion>
          <AccordionSummary>Title</AccordionSummary>
          <AccordionDetails>Content</AccordionDetails>
        </Accordion>
      </AccordionGroup> */}
    </>
  );
};

export default UpstreamEditor;
