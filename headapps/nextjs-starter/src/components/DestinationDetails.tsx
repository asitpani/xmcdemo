import { JSX } from 'react';
import { Text as JSSText, RichText, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

type DestinationDetailsProps = {
  id: string;
  url: string;
  fields: {
    Title?: { value: string };
    Content?: { value: string };
    Image?: { jsonValue: { src: string; alt?: string } };
  };
};

export const Default = (props: DestinationDetailsProps): JSX.Element => {
  return (
    <div className="container my-5">
      <div className="row row-cols-1 g-4">
        <div className="col">
          <div className="bg-light p-4 rounded shadow text-center h-100 d-flex flex-column">
            {/* Title */}
            <h3 className="mb-3 fw-bold text-dark">
              <JSSText field={props.fields.Title} />
            </h3>

            {/* Description */}
            <div className="mb-3 flex-grow-1">
              <RichText field={props.fields.Content} />
            </div>

            {/* Image */}
            <div>
              <JssImage field={props.fields.Image} className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
