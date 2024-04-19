const useAccessControl = (userFunctions) => {
    const checkAccess = (requiredFunction) => userFunctions.includes(requiredFunction);
    return { checkAccess };
  };
  
  const SomeComponent = ({ userFunctions }) => {
    const { checkAccess } = useAccessControl(userFunctions);
  
    return (
      <div>
        {checkAccess('edit') && <button>Edit</button>}
        {checkAccess('delete') && <button>Delete</button>}
      </div>
    );
  };
  import { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketIOClient(ENDPOINT);

const SomeComponent = () => {
  const [userFunctions, setUserFunctions] = useState([]);

  useEffect(() => {
    socket.on("updateUserFunctions", data => {
      setUserFunctions(data.functions);
    });

    return () => socket.off("updateUserFunctions");
  }, []);

  const hasPermission = (permission) => userFunctions.includes(permission);

  return (
    <div>
      {hasPermission('edit') && <button>Edit</button>}
      {hasPermission('delete') && <button>Delete</button>}
    </div>
  );
};
