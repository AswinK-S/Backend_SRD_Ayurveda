import { findAdminByEmail } from "./findByEmail";
import { getUsersRepo } from "./getUsers";
import { getDoctorsRepo } from "./getDoctors";
import { getTreatmentsRepo } from "./getTreatments";
import { trtmntStatusChange } from "./lstUnlstTrtmnt";
import { findTreatment } from "./getTreatment";
import { rmvSubTrtmntRepo } from "./rmvSbTrtmnt";

export {
    findAdminByEmail,
    getUsersRepo,
    getDoctorsRepo,
    getTreatmentsRepo,
    trtmntStatusChange,
    findTreatment,
    rmvSubTrtmntRepo
}