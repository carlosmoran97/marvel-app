import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

export default function CharactersSearchForm({ handleSubmit, handleClear }) {

    return (
        <Formik
            initialValues={{
                nameStartsWith: '',
                comics: [],
                stories: [],
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            validationSchema={Yup.object({
                nameStartsWith: Yup.string().required('This field is required')
            })}
        >
            {({ errors, touched, handleSubmit, values }) => (<Form onSubmit={handleSubmit}>
                <label htmlFor="nameStartsWith">Nombre:</label>
                <Field type="text" name="nameStartsWith" />
                {(errors.nameStartsWith && touched.nameStartsWith) && errors.nameStartsWith}
                <FieldArray
                    name="comics"
                    render={arrayHelpers => (
                        <div>
                            {values.comics && values.comics.length > 0 
                                ? (values.comics.map((comic, index) => (
                                <div key={`comic-${index}`}>
                                    <Field name={`comics.${index}`} />
                                    <button type="button" onClick={() => arrayHelpers.remove(index)}>-</button>
                                    <button type="button" onClick={() => arrayHelpers.insert(index+1, '')}>+</button>
                                </div>
                                ))) 
                                : (
                                    <button type="button" onClick={
                                        () => arrayHelpers.push('')
                                    }>Add a comic</button>
                                )}
                        </div>
                    )}
                />
                <FieldArray
                    name="stories"
                    render={arrayHelpers => (
                        <div>
                            {values.stories && values.stories.length > 0 
                                ? (values.stories.map((story, index) => (
                                <div key={`story-${index}`}>
                                    <Field name={`stories.${index}`} />
                                    <button type="button" onClick={() => arrayHelpers.remove(index)}>-</button>
                                    <button type="button" onClick={() => arrayHelpers.insert(index+1, '')}>+</button>
                                </div>
                                ))) 
                                : (
                                    <button type="button" onClick={
                                        () => arrayHelpers.push('')
                                    }>Add a story</button>
                                )}
                        </div>
                    )}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={handleClear}>Clear</button>
            </Form>)}

        </Formik>
    )
}
