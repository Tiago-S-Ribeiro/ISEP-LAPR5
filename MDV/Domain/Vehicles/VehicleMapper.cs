using System;
using DDDSample1.Domain.Vehicles;

namespace DDDSample1.Domain.Vehicles{
    public class VehicleMapper{
        public static VehicleDto toDTO(CreatingVehicleDto requestBody){
            
            DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime serviceAdmission = start.AddMilliseconds(requestBody.ServiceAdmission);

            return new VehicleDto(requestBody.LicensePlate, requestBody.VIN, requestBody.Type, serviceAdmission);
        }

        public static VehicleDto toDTO(Vehicle requestBody){
            return new VehicleDto(requestBody.Id.AsString(), requestBody.LicensePlate, requestBody.VIN, requestBody.Type.Value, requestBody.ServiceAdmission);
        }

        public static Vehicle toDomain(VehicleDto dto){
            return new Vehicle(dto.LicensePlate, dto.VIN, new VehicleType(dto.Type), dto.ServiceAdmission);
        }
    }
}