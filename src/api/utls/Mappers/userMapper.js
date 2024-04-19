export const userMap = (user) => {
    return {
      id_user: user.id,
      user_email: user.email,
      user_password: user.password,
    };
  };
  
  export const mapUserList = (users) => {
    return users.map(userMap);
  };