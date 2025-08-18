import { JSX } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ServiceFields, ServiceProps, Default as Service } from 'src/atoms/Services/Service';

interface ServiceTeasureFields {
  Services: Array<Services>;
}

interface Services {
  fields: ServiceFields;
}
type ServicesTeaserProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ServiceTeasureFields;
};

export const Default = (props: ServicesTeaserProps): JSX.Element => {
  const services = props.fields?.Services ?? [];
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {services.map((service, idx) => {
        const serviceProps: ServiceProps = {
          params: props.params,
          fields: service.fields,
        };
        return <Service key={idx} {...serviceProps}></Service>;
      })}
    </div>
  );
};
