import * as React from 'react';
import styles from './AppDashboard.module.scss';
import type { IAppDashboardProps } from './IAppDashboardProps';

export default class AppDashboard extends React.Component<IAppDashboardProps, {}> {
  public render(): React.ReactElement<IAppDashboardProps> {
    const {
      items
    } = this.props;

    return (
      <section className={styles.appDashboard}>
          {items.length > 0 ? (items.map((item, i) => {
            return (
              <a href={item.URL ? item.URL : ''} target="_blank" rel="noreferrer" key={i} className={styles.appDashboardItem}>
                  {item.Icon && <img src={item.Icon} alt={item.Title} />}
                  <p>{item.Title}</p>
              </a>
            )
          })) : <p>No "Quick Links" list exists on this site!</p>}
      </section>
    );
  }
}
