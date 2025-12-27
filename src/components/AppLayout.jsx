import Layout from './Layout';
import AppAuth from './auth/AppAuth';
// import AppContent from './content/app/AppContent';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import ContentHistory from './content/history/ContentHistory';
import ContentFormUploads from './content/upload/ContentFormUploads';
import ContentSettings from './content/settings/ContentSettings';
import ContentListening from './content/listening/ContentListening';
import ContentPlaylists from './content/playlists/ContentPlaylists';
import AuthorLayout from './content/author/AuthorLayout';
import AuthorTracks from './content/author/components/AuthorTracks';
import AuthorPlaylists from './content/author/components/AuthorPlaylists';
import AuthorLayoutContext from './content/author/AuthorLayoutContext';
import ContentSearch from './content/search/ContentSearch';
import AuthSignin from './auth/AuthSignin';
import AuthRegister from './auth/AuthRegister';
import AppContent from './content/appnew/AppContent';

export default function AppLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<AppContent />} />
          <Route path='/search' element={<ContentSearch />} />
          <Route path='/listen' element={<ContentListening />} />
          <Route path='/settings' element={<ContentSettings />} />
          <Route path='/playlists' element={<ContentPlaylists />} />
          <Route path='/history' element={<ContentHistory />} />
          <Route path='/upload-file' element={<ContentFormUploads />} />
          <Route path='/author' element={<AuthorLayoutContext />} >
            <Route index element={<AuthorTracks />} />
            <Route path='tracks' element={<AuthorTracks />} />
            <Route path='playlists' element={<AuthorPlaylists />} />
          </Route>
        </Route>
        <Route path='/auth' element={<AppAuth />}>
          <Route index element={<AuthSignin />} />
          <Route path='signin' element={<AuthSignin />} />
          <Route path='reg' element={<AuthRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}