import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Main from '../../../layouts/admin/strand/strand';

// ----------------------------------------------------------------------

const metadata = { title: `Strand | Admin - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <Main />
    </>
  );
}
