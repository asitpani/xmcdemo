import { JSX } from 'react';
import {
  ComponentParams,
  Field,
  ImageField,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface ServiceFields {
  Heading: Field<string>;
  Description: Field<string>;
  Image: ImageField;
}

export type ServiceProps = {
  params: ComponentParams;
  fields: ServiceFields;
};

export const Default = (props: ServiceProps): JSX.Element => {
  return (
    <div className="col">
      <div className="bg-light p-4 rounded shadow d-flex align-items-center">
        <div className="me-4 text-end flex-grow-1">
          <h5 className="mb-3 fw-bold">
            <JSSText field={props.fields.Heading} />
          </h5>
          <p className="mb-0">
            <JSSText field={props.fields.Description} />
          </p>
        </div>
        <div className="text-primary">
          <i className="fa fa-hotel fa-4x"></i>
        </div>
      </div>
    </div>
  );
};
