using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.DriverDuties{
    public class DriverDutyService: IDriverDutyService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDriverDutyRepository _repo;

        public DriverDutyService(IUnitOfWork unitOfWork, IDriverDutyRepository repo){
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<DriverDutyDto> AddAsync(DriverDutyDto dto){
            
            var driverDuty = DriverDutyMapper.toDomain(dto);
            await this._repo.AddAsync(driverDuty);
            await this._unitOfWork.CommitAsync();

            return DriverDutyMapper.toDTO(driverDuty);
        }

        public async Task<DriverDutyDto> GetByIdAsync(DriverDutyId id){
            
            var driverDuty = await this._repo.GetByIdAsync(id);
            if (driverDuty == null){ return null;}
                
            return DriverDutyMapper.toDTO(driverDuty);
        }

        public async Task<List<DriverDutyDto>> GetAllAsync(){
            var driverDutyList = await this._repo.GetAllAsync();

            foreach (DriverDuty driverDuty in driverDutyList) {
                Console.WriteLine("Driver Duty ->" + driverDuty.ToString());
            }
            List<DriverDutyDto> listDto = driverDutyList.ConvertAll<DriverDutyDto>(driverDuty => DriverDutyMapper.toDTO(driverDuty));
            
            return listDto;
        }
    }
}