import { JSX } from 'react';
import {
  Field,
  ComponentParams,
  ImageField,
  RichText,
  Text as JSSText,
  NextImage as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
}
type HeroBannerProps = {
  params: ComponentParams;
  fields: Fields;
};

export const Default = (props: HeroBannerProps): JSX.Element => {
  return (
    <div className="container my-5">
      <div className="row align-items-center bg-light p-4 rounded shadow">
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-5 fw-bold">
            <JSSText field={props.fields.Title} />
          </h1>
          <p className="lead">
            <RichText field={props.fields.Description} />
          </p>
        </div>
        <div className="col-md-6 text-center">
          <JssImage field={props.fields.Image} />
        </div>
      </div>
    </div>
  );
};
