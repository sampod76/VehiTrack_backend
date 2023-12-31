import express from 'express';
import { SuperAdminRoutes } from '../modules/superAdmin/superAdmin.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { DriverRoutes } from '../modules/driver/driver.route';
import { HelperRoutes } from '../modules/helper/helper.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { ModelRoutes } from '../modules/model/model.route';
import { VehicleRoutes } from '../modules/vehicle/vehicle.route';
import { PartyRoutes } from '../modules/Party/party.route';
import { AccountTypeRoutes } from '../modules/accountType/accountType.route';
import { AccountHeadRoutes } from '../modules/accountHead/accountHead.route';
import { ExpenseHeadRoutes } from '../modules/expenseHead/expenseHead.route';
import { MaintenanceHeadRoutes } from '../modules/maintenanceHead/maintenanceHead.route';
import { ExpenseRoutes } from '../modules/expense/expense.route';
import { FuelTypeRoutes } from '../modules/fuelType/fuelType.route';
import { FuelStationRoutes } from '../modules/fuelStation/fuelStation.route';
import { FuelRoutes } from '../modules/fuel/fuel.route';
import { UomRoutes } from '../modules/uom/Uom.route';
import { EquipmentRoutes } from '../modules/equipment/equipment.route';
import { EquipmentInRoutes } from '../modules/equipmentIn/equipmentIn.route';
import { AccidentHistoryRoutes } from '../modules/accidentHistory/accidentHistory.route';
import { PaperWorkRoutes } from '../modules/paperWork/paperWork.route';
import { MaintenanceRoutes } from '../modules/maintenance/maintenance.route';
import { TripRoutes } from '../modules/trip/trip.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { ReportRoutes } from '../modules/report/report.route';
import { ConversationRoutes } from '../modules/conversation/conversation.route';
import { MessageRoutes } from '../modules/message/message.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/super-admin',
    route: SuperAdminRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/driver',
    route: DriverRoutes,
  },
  {
    path: '/helper',
    route: HelperRoutes,
  },
  {
    path: '/brand',
    route: BrandRoutes,
  },
  {
    path: '/model',
    route: ModelRoutes,
  },
  {
    path: '/vehicle',
    route: VehicleRoutes,
  },
  {
    path: '/party',
    route: PartyRoutes,
  },
  {
    path: '/trip',
    route: TripRoutes,
  },
  {
    path: '/account-type',
    route: AccountTypeRoutes,
  },
  {
    path: '/account-head',
    route: AccountHeadRoutes,
  },
  {
    path: '/expense-head',
    route: ExpenseHeadRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
  {
    path: '/fuel-type',
    route: FuelTypeRoutes,
  },
  {
    path: '/fuel-station',
    route: FuelStationRoutes,
  },
  {
    path: '/fuel',
    route: FuelRoutes,
  },
  {
    path: '/uom',
    route: UomRoutes,
  },
  {
    path: '/equipment',
    route: EquipmentRoutes,
  },
  {
    path: '/equipment-in',
    route: EquipmentInRoutes,
  },
  {
    path: '/maintenance-head',
    route: MaintenanceHeadRoutes,
  },
  {
    path: '/maintenance',
    route: MaintenanceRoutes,
  },
  {
    path: '/accident-history',
    route: AccidentHistoryRoutes,
  },
  {
    path: '/paper-work',
    route: PaperWorkRoutes,
  },
  {
    path: '/report',
    route: ReportRoutes,
  },
  {
    path: '/conversations',
    route: ConversationRoutes,
  },
  {
    path: '/messages',
    route: MessageRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
