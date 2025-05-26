import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import AppDashboard from './components/AppDashboard';
import { IAppDashboardProps } from './components/IAppDashboardProps';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IAppDashboardWebPartProps {
  items: any[];
}

export default class AppDashboardWebPart extends BaseClientSideWebPart<IAppDashboardWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IAppDashboardProps> = React.createElement(
      AppDashboard,
      {
        items: this.properties.items
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected async onInit(): Promise<any> {
    const sp = spfi().using(SPFx(this.context));

    try {
      const items = await sp.web.lists.getByTitle("Quick Links").items();
      console.log(items);
      return this.properties.items = items;
    } catch (error) {
      return this.properties.items = [];
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
          ]
        }
      ]
    };
  }
}
