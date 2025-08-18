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
    <div className="col-md-6">
      <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 pe-0">
        <div className="service-content text-end">
          <h5 className="mb-4">
            <JSSText field={props.fields.Heading} />
          </h5>
          <p className="mb-0">
            <JSSText field={props.fields.Description} />
          </p>
        </div>
        <div className="service-icon p-4">
          <i className="fa fa-hotel fa-4x text-primary"></i>
        </div>
      </div>
    </div>
  );
};
