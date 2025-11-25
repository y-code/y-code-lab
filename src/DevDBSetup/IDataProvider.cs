using Microsoft.EntityFrameworkCore;
using YCodeLab.DBFactory;

namespace YCodeLab.DevDBSetup
{
    public interface IDataProvider
    {
        void SetupData();
    }
}
