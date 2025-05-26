import * as React from 'react';
import styles from './AppDashboard.module.scss';
import type { IAppDashboardProps } from './IAppDashboardProps';

const AppDashboard: React.FC<IAppDashboardProps> = (props: IAppDashboardProps) => {
  const { items } = props;

  const DefaultIcon = `${require('../assets/default.png')}`;

  return (
    <section className={styles.appDashboard}>
        {items.length > 0 ? (items.map((item, i) => {
          const { Title, Link } = item;

          let ParsedIcon: string = '';

          if (item.Icon0) {
            ParsedIcon = item.Icon0 ? JSON.parse(item.Icon0).serverRelativeUrl : DefaultIcon;
          } else {
            ParsedIcon = item.Icon ? JSON.parse(item.Icon).serverRelativeUrl : DefaultIcon;
          }

          return (
            <a href={Link ? Link : ''} target="_blank" rel="noreferrer" key={i} className={styles.appDashboardItem}>
                <div className={styles.appDashboardIcon}>
                  {ParsedIcon && <img src={ParsedIcon} alt={Title} />}
                </div>

                <p>{Title}</p>
            </a>
          )
        })) : <p>No "Quick Links" list exists on this site!</p>}
    </section>
  );
}

export default AppDashboard;