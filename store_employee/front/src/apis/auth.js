/* global $ */
const auth = async (data) => {
    try {
        return {
            success : true,
            token   : 'ZZZZ'
        }
        // TODO: Back
        // let res = await $.ajax(`http://localhost:3537/login`, {
        //     data: JSON.stringify(data),
        //     contentType: 'application/json',
        //     type: 'POST'
        // })
        //
        // return res

    } catch (e) {
        if (e.responseJSON) {
            throw e.responseJSON.error;
        }

        throw e
    }
}

export {auth}
