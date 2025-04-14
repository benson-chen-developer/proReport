// export const getInitialProjection = (
//     projections: Projection[], 
//     paramFilter?: string, paramPropValue?: string
// ): Projection => {
//     let initalPickedProjection = null;

//     if(paramFilter && paramPropValue) {  /* If there is a filter in the url */
//         try {
//             const filterFromParam: Filter = JSON.parse(paramFilter as string);

//             if(paramPropValue){
//                 const foundProp = projections.find(p => 
//                     p.values[p.values.length-1] === Number(paramPropValue) &&
//                     p.period === filterFromParam.period &&
//                     p.name === filterFromParam.stat
//                 );
//                 if(foundProp) initalPickedProjection = foundProp;
//             }
//         } catch (error) {
//             /* Someone messed up the url just don;t parse it */
//             console.error("Error parsing filter:", error);
//         }
//     } 

//     if(!initalPickedProjection){
//         initalPickedProjection = projections[0];
//     }

//     return initalPickedProjection;
// }
