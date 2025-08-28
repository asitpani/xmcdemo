import { JSX } from 'react';
import Link from 'next/link';
import { Text as JSSText, RichText, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

type DestinationItem = {
  id: string;
  url: string;
  fields: {
    Title?: { value: string };
    Content?: { value: string };
    Image?: { jsonValue: { src: string; alt?: string } };
  };
};

type DestinationProps = {
  fields: {
    items: DestinationItem[];
  };
};

export const Default = (props: DestinationProps): JSX.Element => {
  const children = props.fields?.items || [];

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="fw-bold text-dark">Our Destinations</h1>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4 align-items-stretch">
        {children.map((child) => (
          <div key={child.id} className="col d-flex">
            <div className="bg-light p-4 rounded shadow text-center h-100 d-flex flex-column flex-fill">
              {/* Title */}
              <h3 className="mb-3 fw-bold text-dark">
                <Link href={child.url || '#'} className="text-decoration-none text-dark">
                  <JSSText field={child.fields.Title} />
                </Link>
              </h3>

              {/* Description (force equal height) */}
              <div className="mb-3 flex-grow-1 d-flex align-items-stretch justify-content-center">
                <div className="w-100 mx-auto" style={{ maxWidth: '500px' }}>
                  <RichText field={child.fields.Content} />
                </div>
              </div>

              {/* Image */}
              <div>
                <JssImage field={child.fields.Image} className="img-fluid rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
