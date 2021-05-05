// import { formatMessage } from 'umi-plugin-locale';
// export default function() {
//   return (
//     <div className={styles.normal}>
//       <div className={styles.welcome} />
//       <ul className={styles.list}>
//         <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
//         <li>
//           <a href="https://umijs.org/guide/getting-started.html">
//             {formatMessage({ id: 'index.start' })}
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }

import React, { PureComponent } from 'react'
import { Redirect } from 'umi'

export default class Index extends PureComponent {
  render() {
    return <Redirect to="/dashboard/alpha" />
  }
}
