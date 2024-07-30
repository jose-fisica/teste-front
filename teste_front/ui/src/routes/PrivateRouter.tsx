import { Navigate, PathRouteProps, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import styled from 'styled-components';
import { Header } from '../components/Header';

interface PrivateRouteProps extends PathRouteProps {
  className?: string;
  withFooter?: boolean;
  withHeader?: boolean;
  permission?: string | string[];
}

const PrivateRoute = ({
  className,
}: PrivateRouteProps) => {
  return (
    <>
      {isAuthenticated() ? (
        <div className={className}> 
          <Header />
          <div className='content-container'>
            <Outlet /> 
          </div>
        </div>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};

export default styled(PrivateRoute)`
    position: relative;
    min-height: 100vh;

    .content-container{
      padding-bottom: 238px;
    }
`;
