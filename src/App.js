

import './App.css';

import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './utils/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import { children } from 'react-router-dom';
import WatchPage from './components/WatchPage';
import SearchResultPage from './components/SearchResultPage';


const appRouter = createBrowserRouter(
  [

    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer/>
        },
        {
          path: "watch",
          element: <WatchPage/>
        },{
          path:"results",
          element:<SearchResultPage/>
        }
      ]
    }
  ]
)

function App() {
  return (

    <Provider store={store}>
      <div>
   
        <RouterProvider router={appRouter} />

      </div>
    </Provider>


  );
}

export default App;
