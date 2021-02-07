using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.VehicleDuties{
    public class VehicleDutyService: IVehicleDutyService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleDutyRepository _repo;

        public VehicleDutyService(IUnitOfWork unitOfWork, IVehicleDutyRepository repo){
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<VehicleDutyDto> AddAsync(VehicleDutyDto dto){
            
            var vehicleDuty = VehicleDutyMapper.toDomain(dto);
            await this._repo.AddAsync(vehicleDuty);
            await this._unitOfWork.CommitAsync();

            return VehicleDutyMapper.toDTO(vehicleDuty);
        }

        public async Task<VehicleDutyDto> GetByIdAsync(VehicleDutyId id){
            
            var vehicleDuty = await this._repo.GetByIdAsync(id);
            if (vehicleDuty == null){ return null;}
                
            return VehicleDutyMapper.toDTO(vehicleDuty);
        }

        public async Task<List<VehicleDutyDto>> GetAllAsync(){
            var vehicleDutyList = await this._repo.GetAllAsync();

            foreach (VehicleDuty vehicleDuty in vehicleDutyList) {
                Console.WriteLine("Vehicle Duty ->" + vehicleDuty.ToString());
            }
            List<VehicleDutyDto> listDto = vehicleDutyList.ConvertAll<VehicleDutyDto>(vehicleDuty => VehicleDutyMapper.toDTO(vehicleDuty));
            
            return listDto;
        }
    }
}