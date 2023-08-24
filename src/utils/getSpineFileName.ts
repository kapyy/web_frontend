export function getSpineFileName(model_name: string) {
    let atlasUrl = 'outputs/' + model_name + '/spinepack.atlas'
    let imgUrl = 'outputs/' + model_name + '/spinepack.png'
    let thumbnail_uri = 'outputs/' + model_name + '/image.png'
    return {
        'atlas': atlasUrl,
        'png': imgUrl,
        thumbnail_uri: thumbnail_uri,
        'json': "outputs/person-normal.json"
    }
}