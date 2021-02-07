using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Workblocks{
    public class WorkblockService: IWorkblockService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWorkblockRepository _repo;

        public WorkblockService(IUnitOfWork unitOfWork, IWorkblockRepository repo){
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<WorkblockDto> AddAsync(WorkblockDto dto){
            
            var workblock = WorkblockMapper.toDomain(dto);
            await this._repo.AddAsync(workblock);
            await this._unitOfWork.CommitAsync();

            return WorkblockMapper.toDTO(workblock);
        }

        public async Task<WorkblockDto> GetByIdAsync(WorkblockId id){
            
            var workblock = await this._repo.GetByIdAsync(id);
            if (workblock == null){
                return null;
            }
                
            return WorkblockMapper.toDTO(workblock);
        }

        public async Task<List<WorkblockDto>> GetAllAsync(){
            var list = await this._repo.GetAllAsync();

            foreach (Workblock wb in list) {
                Console.WriteLine("Workblock: " + wb.ToString());
            }
            List<WorkblockDto> listDto = list.ConvertAll<WorkblockDto>(workblock => WorkblockMapper.toDTO(workblock));
            
            return listDto;
        }
    }
}