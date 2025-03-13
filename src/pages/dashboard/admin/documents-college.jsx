import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Main from '../../../layouts/admin/documents-college';

// ----------------------------------------------------------------------

const metadata = { title: `Document College | Admin - ${CONFIG.site.name}` };

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
