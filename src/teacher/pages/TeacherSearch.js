import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TeacherSearchItem from "../components/TeacherSearchItem";

import classes from "./TeacherSearch.module.css";

const TeacherSearch = () => {
  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const [loadedTeachers, setLoadedTeachers] = useState();
  const teacherName = useParams().teacherId;

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(`${process.env.REACT_APP_BACKEND_URL}/teachers/find/${teacherName}`);
        setLoadedTeachers(responseData.data.data);
      } catch (err) {}
    };
    fetchTeacher();
    document.title = `搜尋:${teacherName}`;
  }, [sendRequset, teacherName]);

  return (
    <>
      {isLoading && <Loading overlay />}
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.searchLayout}>
        {!isLoading && loadedTeachers && (
          <ul>
            {loadedTeachers.map((teacher) => (
              <TeacherSearchItem loadedTeachers={teacher} key={teacher.id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TeacherSearch;
