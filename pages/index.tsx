import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import PrivateRoute from '../hoc/PrivateRoute';

const Home: NextPage = () => {
  return (
    <PrivateRoute>
      <Navbar wallet />
    </PrivateRoute>
  );
};

export default Home;
