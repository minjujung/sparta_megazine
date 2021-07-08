import { Notifications } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

import React, { useEffect, useState } from "react";

import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
import { realtime } from "../shared/firebase";

const NotiBadge = (props) => {
  const user_id = useSelector((state) => state.user.user.uid);
  const [is_read, setIsRead] = useState(true);

  const notiCheck = () => {
    history.push("/noti");
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });

    props._onClick();
  };

  useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);

    notiDB.on("value", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val()) {
        setIsRead(snapshot.val().read);
      }
    });

    return () => notiDB.off();
  }, []);
  return (
    <>
      <Badge
        invisible={is_read}
        color="secondary"
        onClick={notiCheck}
        variant="dot"
      >
        <Notifications />
      </Badge>
    </>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
