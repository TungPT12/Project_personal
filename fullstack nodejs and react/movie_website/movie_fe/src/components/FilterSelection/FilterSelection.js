import { getAllGenresAPI } from "../../services/apis/genre-service-api";
import { memo, useEffect, useState } from 'react'
import { getAllMediaAPI } from "../../services/apis/media-service-api";
import { getAllYearAPI } from "../../services/apis/year-service-api";
import { getAllLanguageAPI } from "../../services/apis/language-service-api";
import styles from './FilterSelection.module.css';
function FilterSelection({ filterType, setFilterParams, filterParams }) {
    const [dropdown, setDropDown] = useState(<></>);
    const getFilterData = (filterType) => {
        switch (filterType) {
            case 'genre':
                getAllGenresAPI().then((response) => {
                    const selectionE = <select value={filterParams.genre} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            genre: e.target.value,
                        })
                    }}>
                        <option value='none'>Thể loại</option>
                        {
                            response.data.map((genre) => {
                                return <option value={genre.id}>{genre.name}</option>
                            })
                        }
                    </select>
                    setDropDown(selectionE)
                }).catch((error) => {
                    alert(error.message);
                })
                break;
            case 'mediaType':
                getAllMediaAPI().then((response) => {
                    const selectionE = <select value={filterParams.mediaType} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            mediaType: e.target.value,
                        })
                    }}>
                        <option value='none'>Phương tiện</option>
                        {
                            response.data.map((media) => {
                                return <option value={media}>{media}</option>
                            })
                        }
                    </select>
                    setDropDown(selectionE)
                }).catch((error) => {
                    alert(error.message);
                })
                break;
            case 'year':
                getAllYearAPI().then((response) => {
                    const selectionE = <select value={filterParams.year} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            year: e.target.value,
                        })
                    }}>
                        <option value='none'>Năm</option>
                        {
                            response.data.map((year) => {
                                return <option value={year}>{year}</option>
                            })
                        }
                    </select>
                    setDropDown(selectionE)
                }).catch((error) => {
                    alert(error.message);
                })
                break;
            case 'language':
                getAllLanguageAPI().then((response) => {
                    const selectionE = <select value={filterParams.language} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            language: e.target.value,
                        })
                    }}>
                        <option value='none'>Ngôn ngữ</option>
                        {
                            response.data.map((language) => {
                                if (language === 'en') {
                                    return <option value={language}>English</option>
                                } else if (language === 'ja') {
                                    return <option value={language}>Japan</option>
                                } else {
                                    return <option value={language}>Korean</option>
                                }
                            })
                        }
                    </select>
                    setDropDown(selectionE)
                }).catch((error) => {
                    alert(error.message);
                })
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        getFilterData(filterType)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterType, filterParams]);
    return (
        <>
            {dropdown}
        </>
    );
}

export default memo(FilterSelection);