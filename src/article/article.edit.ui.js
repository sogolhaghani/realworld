import React, { useEffect, useState } from 'react';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { loadArticle, clearUI, inputChangeHandler, requiredValidation, onSubmitArticle, clearValidation, updateStatus } from './article.action';
import { loadAllTags } from '../tag/tag.action';
import InputText from '../component/InputText';
import Checkbox from '../component/Checkbox';
import Alert from '../component/Alert';
import Button from '../component/Button';

import { displayValidationText, STATUS } from '../utility/uis.utils';

const messeges = {
    title_edit: 'Edit Article',
    title_new: 'New Article',
    title: 'Title',
    title_required: "Required field",
    description: 'Description',
    body: 'Body',
    tags: 'Tags',
    submit: 'Submit'
}


const EditPage = (props) => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const title = useSelector(state => state.article.entity.title);
    const status = useSelector(state => state.article.status);
    const description = useSelector(state => state.article.entity.description);
    const body = useSelector(state => state.article.entity.body);
    const validations = useSelector(state => state.article.validations) || [];

    const allSelectedTags = useSelector(state => state.article.entity.tagList || [])
    const allTags = useSelector(state => state.tag.all || [])

    const [tag, setTag] = useState('');
    useEffect(() => {
        dispatch(clearUI())
        dispatch(loadAllTags())
        dispatch(updateStatus(STATUS.init))

        if (slug)
            dispatch(loadArticle(slug))
    }, [slug, dispatch])

    if (status === STATUS.saved){
        props.history.push('/article/list')
        return null
    }

    return (
        <div className="container-fluid">
            <h1>{slug ? messeges.title_edit : messeges.title_new}</h1>
            <Alert show={validations.filter(x => x.field == null).length > 0} danger dismissible
                emphasis={messeges.login_failed_bold} onClose={() => dispatch(clearValidation())}
                value={validations.filter(x => x.field == null).length > 0 ? validations.filter(x => x.field == null)[0].messege : ""} />
            <div className={'row'}>
                <div className="col-md-8">
                    <InputText label={messeges.title}
                        value={title || ''}
                        changeHandler={val => dispatch(inputChangeHandler(val, 'title'))}
                        blurHandler={() => dispatch(requiredValidation('title'))}
                        validation={displayValidationText('title', messeges, validations)}
                    />

                    <InputText label={messeges.description}
                        value={description || ''}
                        changeHandler={val => dispatch(inputChangeHandler(val, 'description'))}
                    />

                    <InputText label={messeges.body} area
                        value={body || ''}
                        changeHandler={val => dispatch(inputChangeHandler(val, 'body'))}
                    />


                </div>
                <div className="col-md-4">
                    <InputText label={messeges.tags}
                        value={tag || ''}
                        changeHandler={val => setTag(val)}
                    />
                    <div className="form-control" style={{ height: '255px', overflow: 'auto' }}>
                        {allTags.map((t, key) =>
                            <Checkbox key={key} value={allSelectedTags.filter(x => x === t).length > 0} 
                            label={t} 
                            changeHandler={e => {
                                e ? dispatch(inputChangeHandler([...allSelectedTags, t], 'tagList')) : dispatch(inputChangeHandler(allSelectedTags.filter(x => x !== t), 'tagList'))
                            }} />
                        )}
                    </div>

                </div>
            </div>
            <Button type="submit" primary
                onClick={e => { e.preventDefault(); dispatch(onSubmitArticle()) }}
                disabled={status === STATUS.loading} label={messeges.submit} />


        </div>
    );
};

export default EditPage;