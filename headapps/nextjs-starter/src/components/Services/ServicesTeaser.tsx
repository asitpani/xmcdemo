import { JSX } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ServiceFields, ServiceProps, Default as Service } from 'src/atoms/Services/Service';

interface ServiceTeasureFields {
  services: Array<Services>
}

interface Services {
  fields: ServiceFields
}
type ServicesTeaserProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ServiceTeasureFields;
}

export const Default = (props: ServicesTeaserProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className="row g-4">
        <div className="col-lg-6">
            <div className="row g-4">
              {props.fields.services.map((service, idx) => {
                const serviceProps : ServiceProps = {
                  params: props.params,
                  fields: service.fields
                };
                return <Service key={idx} {...serviceProps}></Service>
              })}                
            </div>
        </div>
    </div>
  );
};
