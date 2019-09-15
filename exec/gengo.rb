require "scanf"
require "time"

class Time
    def era
        era_data = []
        if RbConfig::CONFIG["PLATFORM_DIR"].downcase == "win32" then
        require "win32/registry"
        Win32::Registry::HKEY_LOCAL_MACHINE.open('SYSTEM\CurrentControlSet\Control\Nls\Calendars\Japanese\Eras') do |reg|
            reg.each_value do |name, type, data|
                era_data << [name, data]
            end
        end
        else
        era_data = [
            ["1868 01 01", "明治_明_Meiji_M"],
            ["1912 07 30", "大正_大_Taisho_T"],
            ["1926 12 25", "昭和_昭_Showa_S"],
            ["1989 01 08", "平成_平_Heisei_H"],
            ["2019 05 01", "令和_令_Reiwa_R"]]
        end

        # 元号データーを読み込み
        era = []
        era_data.each do |date, str|
            d = date.scanf "%d %d %d"
            tmp0 = Time.new d[0], d[1], d[2], 0, 0, 0, 32400
            tmp1 = str.split "_"
            tmp = tmp1.unshift tmp0
            era << tmp
        end

        tmp_era = nil
        era.each.with_index do |e, i|
            if era[i][0] <= self then
                unless i == era.size-1 then
                    if self < era[i+1][0] then
                        tmp_era = era[i]
                        break
                    end
                else
                    tmp_era = era[-1]
                    break
                end
            end
        end

        eyear = self.year - tmp_era[0].year + 1
        eyear = "元" if eyear == 1
        "#{tmp_era[1]}#{eyear}年#{self.mon}月#{self.mday}日"
    end
end