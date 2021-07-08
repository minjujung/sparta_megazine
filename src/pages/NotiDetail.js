import React, { useEffect, useState } from "react";
import { Grid } from "../elements";
import NotiCard from "../components/NotiCard";

import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiDetail = (props) => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const notiDB = realtime.ref(`noti/${user.uid}/list`);

    const _noti = notiDB.orderByChild("insert_dt");

    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        console.log(_data);

        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });
        console.log(_noti_list);
        setNoti(_noti_list);
      }
    });
  }, [user]);

  return (
    <>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n, idx) => (
          <NotiCard key={`noti_${idx}`} {...n} />
        ))}
      </Grid>
    </>
  );
};

export default NotiDetail;
