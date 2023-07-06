const HamburgerMenu = () => {
  return (
    <div className="relative w-full h-[1024px] text-left text-lg text-gray font-poppins">
      <div className="absolute top-[0px] left-[0px] bg-ghostwhite w-[358px] h-[1024px]" />
      <div className="absolute top-[129px] left-[44px] rounded-xl bg-mediumslateblue-200 w-[250px] h-12" />
      <div className="absolute top-[140px] left-[64px] w-[108px] h-[27px] text-mediumslateblue-100">
        <b className="absolute top-[0px] left-[53px]">Home</b>
        <img
          className="absolute top-[1px] left-[0px] w-6 h-6 overflow-hidden"
          alt=""
          src="/dashboard-fill0-wght400-grad0-opsz24-1.svg"
        />
      </div>
      <div className="absolute top-[306px] left-[64px] w-[194px] h-[27px]">
        <div className="absolute top-[0px] left-[53px] font-medium">
          Create Institute
        </div>
        <img
          className="absolute top-[2px] left-[0px] w-6 h-6 overflow-hidden"
          alt=""
          src="/schedule-fill0-wght400-grad0-opsz24-1.svg"
        />
      </div>
      <div className="absolute top-[223px] left-[64px] w-[137px] h-[27px]">
        <div className="absolute top-[0px] left-[53px] font-medium">
          Institutes
        </div>
        <img
          className="absolute top-[2px] left-[0px] w-6 h-6 overflow-hidden"
          alt=""
          src="/work-fill0-wght400-grad0-opsz24-1.svg"
        />
      </div>
      <div className="absolute top-[388px] left-[117px] w-[62px] h-[27px]">
        <div className="absolute top-[0px] left-[0px] font-medium">Logout</div>
      </div>
      <img
        className="absolute top-[34px] left-[44px] w-[72px] h-[62px] object-cover"
        alt=""
        src="/rectangle-48@2x.png"
      />
      <img
        className="absolute h-[2.34%] w-[6.7%] top-[37.99%] right-[74.3%] bottom-[59.67%] left-[18.99%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/vector.svg"
      />
    </div>
  );
};

export default HamburgerMenu;
