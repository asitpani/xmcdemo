import { JSX } from 'react';
import Link from 'next/link';
import { Text as JSSText, RichText, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

type DestinationProps = {
  fields: {
    item: {
      id: string;
      title?: { value: string };
      description?: { value: string };
      image?: { jsonValue: { src: string; alt?: string } };
      children?: {
        results: {
          id: string;
          url: { path: string };
          title?: { value: string };
          description?: { value: string };
          image?: { jsonValue: { src: string; alt?: string } };
        }[];
      };
    };
  };
};

export const Default = (props: DestinationProps): JSX.Element => {
  const children = props.fields?.item?.children?.results || [];

  return (
    <div className="container my-5">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {children.map((child) => (
          <div key={child.id} className="col">
            <div className="bg-light p-4 rounded shadow d-flex align-items-center">
              {/* Left text content */}
              <div className="me-4 text-end flex-grow-1">
                <h5 className="mb-3 fw-bold">
                  <Link href={child.url?.path || '#'} className="text-decoration-none text-dark">
                    <JSSText field={child.title} />
                  </Link>
                </h5>
                <p className="mb-0">
                  <RichText field={child.description} />
                </p>
              </div>

              {/* Right side image */}
              <div className="text-primary">
                <JssImage field={child.image} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
