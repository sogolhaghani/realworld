import React, { useEffect, useState, useRef } from 'react';
import { useCookie } from "react-use";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Modal from '../component/Modal';
import Alert from '../component/Alert';
import Button from '../component/Button';
import { STATUS } from '../utility/uis.utils';

import { loadAllArticles, pageChange, deleteArticle } from './article.action';

const messeges = {
    title: "All Posts",
    head_index: "#",
    head_title: "Title",
    head_author: "Author",
    head_tags: "Tags",
    head_excerpt: "Excerpt",
    head_created: "Created",
    more: "...",
    edit: "Edit",
    delete: "Delete",
    prev: "<",
    next: ">",
    deleteModalDescription: 'Are you sure to delete Article?',
    deleteTitle: 'Delete Article',
    success_saved: 'Article created successfuly',
    success_updated: 'Article updated successfuly',
    success_deleted: 'Article deleted successfuly',
    failed_deleted: 'Article deleted Forbiden',
    success_bold: 'Well done! ',
}

const DropDown = (props) => {

    const ref = useRef()
    const [open, setOpen] = useState(false)

    const deleteClickHandler = () => {
        props.onDelete(props.value)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [open])

    return (
        <div ref={ref} className={"btn-group" + (open ? " show" : "")} >
            <Button info className="dropdown-toggle" label={messeges.more} onClick={e => setOpen(!open)} />
            <div className={"dropdown-menu dropdown-menu-right" + (open ? " show" : "")} style={{ left: "auto", right: "0" }}>
                <Link className="dropdown-item" to={`/article/edit/${props.value}`} >{messeges.edit}</Link>
                <button className="dropdown-item" type="button" onClick={() => deleteClickHandler()}>{messeges.delete}</button>
            </div>
        </div>
    )
}


const Pager = (props) => {
    const [value] = useCookie("my-cookie-realwold");
    const dispatch = useDispatch();

    const goToPage = (page) => {
        if (page === props.current)
            return
        dispatch(pageChange(page))
        dispatch(loadAllArticles(value))
    }


    let start = 0;
    let end = 0;
    const DISPLAY_ITEMS = 4;

    if (props.current === 1) {
        start = 1;
        end = DISPLAY_ITEMS
    } else if (props.lastPage) {
        end = props.current
        if (props.current > DISPLAY_ITEMS) {
            start = end - DISPLAY_ITEMS
        } else {
            start = 1
        }

    } else {
        end = props.current + 2
        start = end - DISPLAY_ITEMS + 1
    }


    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className={"page-item" + (props.current === 1 ? " disabled" : "")}>
                    <span className="page-link" tabIndex="-1" onClick={e => { e.preventDefault(); goToPage(props.current - 1) }} >{messeges.prev}</span>
                </li>

                {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(function (x, i) {
                    return (
                        <li key={i} className={"page-item" + (x === props.current ? " active" : "")}>
                            <span className="page-link" onClick={e => { e.preventDefault(); goToPage(x) }}  >{x}</span>
                        </li>
                    );
                })}


                <li className={"page-item" + (props.lastPage ? " disabled" : "")}>
                    <span className="page-link" onClick={e => { e.preventDefault(); goToPage(props.current + 1) }} >{messeges.next}</span>
                </li>
            </ul>
        </nav>
    )
}


const ListPage = () => {
    const [value] = useCookie("my-cookie-realwold");
    const dispatch = useDispatch();
    const list = useSelector(state => state.article.table.list || [])
    const status = useSelector(state => state.article.status)
    const pageItem = useSelector(state => state.article.table.pageItem || [])
    const validations = useSelector(state => state.article.validations) || [];

    const [openModal, setOpenModal] = useState(false);
    const [showAlert, setShowAlert] = useState(null);
    const [deletedItemSlug, setDeletedItemSlug] = useState(null)

    useEffect(() => {
        if (status === STATUS.saved || status === STATUS.updated || status === STATUS.deleted || status === STATUS.validate) {
            setShowAlert(status)
        }
        if (status !== STATUS.list && status !== STATUS.loading)
            dispatch(loadAllArticles(value))
    }, [status, showAlert, dispatch, value]);

    const closeModalHandler = () => {
        setOpenModal(false)
    }

    const deleteArticleConfirm = (id) => {
        dispatch(deleteArticle(id, value));
        setOpenModal(false)
    }

    return (
        <>
            <h1>{messeges.title}</h1>
            <Alert show={showAlert !== null}
                success={showAlert && (showAlert === STATUS.saved || showAlert === STATUS.deleted || showAlert === STATUS.updated)}
                danger={showAlert && showAlert === STATUS.validate} dismissible
                emphasis={showAlert && showAlert !== STATUS.deleted && showAlert !== STATUS.validate ? messeges.success_bold : ""}
                onClose={() => setShowAlert(null)}
                value={showAlert === STATUS.validate ? validations.filter(x => x.field == null)[0].messege : messeges['success_' + showAlert]} />
            <table className="table mt-3">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{messeges.head_index}</th>
                        <th scope="col">{messeges.head_title}</th>
                        <th scope="col">{messeges.head_author}</th>
                        <th scope="col">{messeges.head_tags}</th>
                        <th scope="col">{messeges.head_excerpt}</th>
                        <th scope="col">{messeges.head_created}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) =>
                        <tr key={index}>
                            <td>{index + ((pageItem.page - 1) * pageItem.rowsPerPage) + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.author ? item.author.username : ''}</td>
                            <td>{''}</td>
                            <td>{item.description}</td>
                            <td>{item.createdAt}</td>
                            <td className="d-flex justify-content-end">
                                <DropDown value={item.slug} onDelete={slug => { setOpenModal(true); setDeletedItemSlug(slug) }} />

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pager lastPage={list.length === 0 || list.length < pageItem.rowsPerPage} current={pageItem.page} size={pageItem.rowsPerPage} />
            <Modal show={openModal}
                onClose={() => closeModalHandler()}
                onConfirm={slug => deleteArticleConfirm(slug)}
                value={deletedItemSlug}
                title={messeges.deleteTitle}
                description={messeges.deleteModalDescription}
            />
        </>
    );
};

export default ListPage;