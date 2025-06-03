
function Step({formData,setFormData}){
    return(
        <>
        <input  type="text" placeholder="name"  value={FormData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })}/>
        </>
    );
}

export default Step

