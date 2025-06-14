import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Search from "../../shared/components/Icons/Search";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TeacherSearchItem from "../components/TeacherSearchItem";
import classes from "./TeacherSearch.module.css";

const TeacherSearch = () => {
  const { isLoading, error, sendRequset, clearError } = useHttpClient();
  const [loadedTeachers, setLoadedTeachers] = useState();
  const teacherName = useParams().teacherId;
  const history = useHistory();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const responseData = await sendRequset(
          `${import.meta.env.VITE_BACKEND_URL}/teachers/find/${teacherName}`
        );
        setLoadedTeachers(responseData.data.data);
        // 設定網頁標題
        document.title = `搜尋:${teacherName}`;
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
      }
    };
    fetchTeacher();
  }, [sendRequset, teacherName]);

  if (!isLoading && loadedTeachers && loadedTeachers.length === 1) {
    history.push({
      pathname: `/teacher/${loadedTeachers[0].teacherName}`,
    });
  }

  const hasResults = loadedTeachers && loadedTeachers.length > 0;
  const hasNoResults =
    !isLoading && loadedTeachers && loadedTeachers.length === 0;

  return (
    <>
      {isLoading && <Loading overlay />}
      <ErrorModal error={error} onClear={clearError} />

      <div className={classes.container}>
        {/* Search Header */}
        <div className={classes.header}>
          <div className={classes.searchInfo}>
            <Search />
            <h1 className={classes.title}>搜尋結果</h1>
          </div>
          <p className={classes.searchQuery}>搜尋關鍵字："{teacherName}"</p>
          {hasResults && (
            <p className={classes.resultCount}>
              找到 {loadedTeachers.length} 位老師
            </p>
          )}
        </div>

        {/* Results */}
        <div className={classes.resultsContainer}>
          {hasResults && (
            <div className={classes.teacherGrid}>
              {loadedTeachers.map(teacher => (
                <TeacherSearchItem loadedTeachers={teacher} key={teacher.id} />
              ))}
            </div>
          )}

          {hasNoResults && (
            <div className={classes.emptyState}>
              <Search />
              <h2>找不到相關老師</h2>
              <p>嗯...找不到符合 "{teacherName}" 的老師</p>
              <p>請試試其他搜尋關鍵字，或檢查拼寫是否正確</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherSearch;
