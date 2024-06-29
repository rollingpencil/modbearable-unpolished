import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const createManyPolys = await prisma.polytechnic.createMany({
    data: POLYS,
  });

  const createSPCourses = await prisma.diploma.createMany({
    data: COURSE_SP,
  });

  const createNPCourses = await prisma.diploma.createMany({
    data: COURSE_NP,
  });

  const createNYPCourses = await prisma.diploma.createMany({
    data: COURSE_NYP,
  });

  const createTPCourses = await prisma.diploma.createMany({
    data: COURSE_TP,
  });

  const createRPCourses = await prisma.diploma.createMany({
    data: COURSE_RP,
  });

  return NextResponse.json({ status: "complete" }, { status: 200 });
}

const POLYS = [
  {
    id: "sp",
    name: "Singapore Polytechnic",
  },
  {
    id: "np",
    name: "Ngee Ann Polytechnic",
  },
  {
    id: "nyp",
    name: "Nanyang Polytechnic",
  },
  {
    id: "tp",
    name: "Temasek Polytechnic",
  },
  {
    id: "rp",
    name: "Republic Polytechnic",
  },
];

const RAW_COURSE_SP = [
  {
    year: 2024,
    school: "School of Chemical & Life Sciences",
    course_name: "Diploma in Biomedical Science",
    course_description: "Refer to website",
    course_code: "S98",
    reference:
      "https://www.sp.edu.sg/cls/courses/full-time-diplomas/biomedical-science",
  },
  {
    year: 2024,
    school: "School of Computing",
    course_name: "Diploma in Applied AI & Analytics",
    course_description: "Refer to website",
    course_code: "S30",
    reference:
      "https://www.sp.edu.sg/soc/courses/full-time-diplomas/applied-AI-and-analytics/overview",
  },
  {
    year: 2024,
    school: "School of Chemical & Life Sciences",
    course_name: "Diploma in Applied Chemistry",
    course_description: "Refer to website",
    course_code: "S64",
    reference:
      "https://www.sp.edu.sg/cls/courses/full-time-diplomas/applied-chemistry",
  },
  {
    year: 2024,
    school: "School of Chemical & Life Sciences",
    course_name: "Diploma in Perfumery & Cosmetic Science",
    course_description: "Refer to website",
    course_code: "S38",
    reference:
      "https://www.sp.edu.sg/cls/courses/full-time-diplomas/perfumery-cosmetic-science",
  },
  {
    year: 2024,
    school: "School Electrical & Electronic Engineering",
    course_name: "Diploma in Engineering with Business",
    course_description: "Refer to website",
    course_code: "S42",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/eee/courses/full-time-diplomas/engineering-with-business",
  },
  {
    year: 2024,
    school: "School of Computing",
    course_name: "Diploma in Infocomm Security Management",
    course_description: "Refer to website",
    course_code: "S54",
    reference:
      "https://www.sp.edu.sg/soc/courses/full-time-diplomas/infocomm-security-management",
  },
  {
    year: 2024,
    school: "School of Chemical & Life Sciences",
    course_name: "Diploma in Optometry",
    course_description: "Refer to website",
    course_code: "S67",
    reference: "https://www.sp.edu.sg/cls/courses/full-time-diplomas/optometry",
  },
  {
    year: 2024,
    school: "School Electrical & Electronic Engineering",
    course_name: "Diploma in Computer Engineering",
    course_description: "Refer to website",
    course_code: "S53",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/eee/courses/full-time-diplomas/computer-engineering",
  },
  {
    year: 2024,
    school: "Media, Arts & Design School",
    course_name: "Diploma in Media, Arts & Design",
    course_description: "Refer to website",
    course_code: "S29",
    reference: "https://www.sp.edu.sg/mad",
  },
  {
    year: 2024,
    school: "School of Business",
    course_name: "Diploma in Accountancy",
    course_description: "Refer to website",
    course_code: "S75",
    reference: "https://www.sp.edu.sg/sb/courses/full-time-diplomas/DAC",
  },
  {
    year: 2024,
    school: "School of Business",
    course_name: "Diploma in Business Administration",
    course_description: "Refer to website",
    course_code: "S71",
    reference:
      "https://www.sp.edu.sg/sb/courses/full-time-diplomas/business-administration",
  },
  {
    year: 2024,
    school: "School of Business",
    course_name: "Diploma in Banking & Finance",
    course_description: "Refer to website",
    course_code: "S76",
    reference:
      "https://www.sp.edu.sg/sb/courses/full-time-diplomas/banking-finance",
  },
  {
    year: 2024,
    school: "School of Business",
    course_name: "Common Business Programme",
    course_description: "Refer to website",
    course_code: "S31",
    reference:
      "https://www.sp.edu.sg/sb/courses/full-time-diplomas/common-business-programme",
  },
  {
    year: 2024,
    school: "School of Business",
    course_name: "Diploma in Human Resource Management with Psychology",
    course_description: "Refer to website",
    course_code: "S48",
    reference:
      "https://www.sp.edu.sg/sb/courses/full-time-diplomas/human-resource-management-with-psychology",
  },
  {
    year: 2024,
    school: "School of Architecture & the Built Environment",
    course_name: "Diploma in Architecture",
    course_description: "Refer to website",
    course_code: "S66",
    reference:
      "https://www.sp.edu.sg/abe/courses/full-time-diplomas/architecture",
  },
  {
    year: 2024,
    school: "School of Chemical & Life Sciences",
    course_name: "Diploma in Chemical Engineering",
    course_description: "Refer to website",
    course_code: "S70",
    reference:
      "https://www.sp.edu.sg/cls/courses/full-time-diplomas/chemical-engineering",
  },
  {
    year: 2024,
    school: "School of Chemical & Life Sciences",
    course_name: "Diploma in Food Science & Technology",
    course_description: "Refer to website",
    course_code: "S47",
    reference:
      "https://www.sp.edu.sg/cls/courses/full-time-diplomas/food-science-technology",
  },
  {
    year: 2024,
    school: "School Electrical & Electronic Engineering",
    course_name: "Diploma in Aerospace Electronics",
    course_description: "Refer to website",
    course_code: "S90",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/eee/courses/full-time-diplomas/aerospace-electronics",
  },
  {
    year: 2024,
    school: "School of Mechanical & Aeronautical Engineering",
    course_name: "Diploma in Mechatronics & Robotics",
    course_description: "Refer to website",
    course_code: "S73",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/mae/courses/full-time-diplomas/mechatronics-and-robotics",
  },
  {
    year: 2024,
    school: "School of Computing",
    course_name: "Common Infocomm Technology Programme",
    course_description: "Refer to website",
    course_code: "S32",
    reference:
      "https://www.sp.edu.sg/soc/courses/full-time-diplomas/common-ict-programme/overview",
  },
  {
    year: 2024,
    school: "School of Architecture & the Built Environment",
    course_name: "Diploma in Interior Design",
    course_description: "Refer to website",
    course_code: "S89",
    reference:
      "https://www.sp.edu.sg/abe/courses/full-time-diplomas/interior-design",
  },
  {
    year: 2024,
    school: "School of Computing",
    course_name: "Diploma in Information Technology",
    course_description: "Refer to website",
    course_code: "S69",
    reference:
      "https://www.sp.edu.sg/soc/courses/full-time-diplomas/information-technology",
  },
  {
    year: 2024,
    school: "School of Architecture & the Built Environment",
    course_name: "Diploma in Landscape Architecture",
    course_description: "Refer to website",
    course_code: "S94",
    reference:
      "https://www.sp.edu.sg/abe/courses/full-time-diplomas/landscape-architecture",
  },
  {
    year: 2024,
    school: "School of Architecture & the Built Environment",
    course_name: "Diploma in Integrated Events & Project Management",
    course_description: "Refer to website",
    course_code: "S50",
    reference:
      "https://www.sp.edu.sg/abe/courses/full-time-diplomas/integrated-events-project-management",
  },
  {
    year: 2024,
    school: "School Electrical & Electronic Engineering",
    course_name: "Diploma in Electrical & Electronic Engineering",
    course_description: "Refer to website",
    course_code: "S99",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/eee/courses/full-time-diplomas/electrical-electronic-engineering",
  },
  {
    year: 2024,
    school: "School of Mechanical & Aeronautical Engineering",
    course_name: "Diploma in Aeronautical Engineering",
    course_description: "Refer to website",
    course_code: "S88",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/mae/courses/full-time-diplomas/aeronautical-engineering-",
  },
  {
    year: 2024,
    school: "School of Mechanical & Aeronautical Engineering",
    course_name: "Common Engineering Programme",
    course_description: "Refer to website",
    course_code: "S40",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/mae/courses/common-engineering-programme",
  },
  {
    year: 2024,
    school: "School of Mechanical & Aeronautical Engineering",
    course_name: "Diploma in Mechanical Engineering",
    course_description: "Refer to website",
    course_code: "S91",
    reference:
      "https://www.sp.edu.sg/engineering-cluster/mae/courses/full-time-diplomas/mechanical-engineering",
  },
  {
    year: 2024,
    school: "Singapore Maritime Academy",
    course_name: "Diploma in Maritime Business",
    course_description: "Refer to website",
    course_code: "S74",
    reference:
      "https://www.sp.edu.sg/sma/courses/full-time-diplomas/maritime-business",
  },
  {
    year: 2024,
    school: "School of Architecture & the Built Environment",
    course_name: "Diploma in Facilities Management",
    course_description: "Refer to website",
    course_code: "S95",
    reference:
      "https://www.sp.edu.sg/abe/courses/full-time-diplomas/facilities-management",
  },
  {
    year: 2024,
    school: "School of Architecture & the Built Environment",
    course_name: "Diploma in Civil Engineering",
    course_description: "Refer to website",
    course_code: "S68",
    reference:
      "https://www.sp.edu.sg/abe/courses/full-time-diplomas/civil-engineering",
  },
  {
    year: 2024,
    school: "Singapore Maritime Academy",
    course_name: "Diploma in Marine Engineering",
    course_description: "Refer to website",
    course_code: "S63",
    reference:
      "https://www.sp.edu.sg/sma/courses/full-time-diplomas/marine-engineering",
  },
  {
    year: 2024,
    school: "School of Chemical & Life Sciences",
    course_name: "Common Science Programme",
    course_description: "Refer to website",
    course_code: "S28",
    reference:
      "https://www.sp.edu.sg/cls/courses/full-time-diplomas/common-science-programme/overview",
  },
  {
    year: 2024,
    school: "Singapore Maritime Academy",
    course_name: "Diploma in Nautical Studies",
    course_description: "Refer to website",
    course_code: "S01",
    reference:
      "https://www.sp.edu.sg/sma/courses/full-time-diplomas/nautical-studies/overview",
  },
];

let COURSE_SP = RAW_COURSE_SP.filter(
  (rec) => rec.course_name.includes("Common") == false,
).map((rec) => ({
  id: rec.course_code,
  name: rec.course_name,
  polytechnicId: "sp",
}));

const RAW_COURSE_NP = [
  {
    year: 2023,
    school: "School of Business & Accountancy",
    course_name: "Diploma in Accountancy",
    course_code: "N51",
    course_description:
      "Diploma in Accountancy (N51) equips students with core business knowledge and specialised training in reporting, taxation, assurance and corporate finance, as well as the capability to leverage on financial information for making business decisions related to strategy, governance and sustainability. \nThe curriculum allows students to execute cross-domain projects, explore the latest digitalisation tools, collaborate with industry partners and experience technology in the teaching and learning.\nEvery student has a choice to complete a 6-month or 1-year internship (JobReady Programme), or 1-semester Business Digitalisation track and will obtain a minor in an area of student?s choice through the personalised learning pathway.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-business-accountancy/diploma-in-accountancy",
  },
  {
    year: 2023,
    school: "School of Business & Accountancy",
    course_name: "Diploma in Banking & Finance",
    course_code: "N53",
    course_description:
      "Diploma in Banking & Finance (N53) equips students with knowledge on banking and finance business as well as trends, emerging technology, and how future banks operate in the real world. \nThe curriculum allows students to immerse in the Fintech ecosystem, collaborate with industry partners, execute cross-domain projects, explore the latest digitalisation tools, tap on technology to deliver financial and banking solutions; and incorporate environmental, social and governance (ESG) considerations into financial decisions.\nEvery student has a choice to complete a 6-month or 1-year internship (JobReady Programme), and will obtain a minor in an area of student?s choice through the personalised learning pathway.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-business-accountancy/diploma-in-banking-finance",
  },
  {
    year: 2023,
    school: "School of Business & Accountancy",
    course_name: "Diploma in Business Studies",
    course_code: "N45",
    course_description:
      "Diploma in Business Studies (N45) equips students with core business knowledge and covers all aspects of a business operation across different industry sectors.� Students have a choice of 4 specialisations starting in the second year.� \nThe curriculum allows students to execute cross-domain projects, explore the latest digitalisation tools, collaborate with industry partners and experience technology in the teaching and learning.\nEvery student has a choice to complete a 6-month or 1-year internship (JobReady Programme), or 1-year Business Digitalisation track and will obtain a minor in an area of student?s choice through the personalised learning pathway.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-business-accountancy/diploma-in-business-studies",
  },
  {
    year: 2023,
    school: "School of Business & Accountancy",
    course_name: "Common Business Programme",
    course_code: "N97",
    course_description:
      "Common Business Programme (N97) equips students with core business knowledge and lays a strong foundation in entrepreneurial traits, while letting students explore their interest in various business disciplines before they rank their choice of the preferred business diploma courses at the end of Year 1.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-business-accountancy/common-business-programme",
  },
  {
    year: 2023,
    school: "School of Business & Accountancy",
    course_name: "Diploma in International Trade & Business",
    course_code: "N85",
    course_description:
      "Diploma in International Trade & Business (N85) equips students with specialised knowledge and skills to manage operations and transformation in trade, supply chain and logistics.\nThe curriculum focuses on technology, business transformation, sustainability, industry collaboration, cross-disciplinary learning and critical core skills to future-ready students to carve out a career across a diverse range of industries.\nEvery student has a choice to complete a 6-month or 1-year internship (JobReady Programme), and will obtain a minor in an area of student?s choice through the personalised learning pathway.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-business-accountancy/diploma-in-international-trade-business",
  },
  {
    year: 2023,
    school: "School of Business & Accountancy",
    course_name: "Diploma in Tourism & Resort Management",
    course_code: "N72",
    course_description:
      "Diploma in Tourism & Resort Management (N72) equips students with core business knowledge and core competencies in the key sectors of the tourism industry such as hospitality, travel, leisure and lifestyle, and the MICE (Meetings, Incentives, Conventions and Exhibitions) sector. \nThe curriculum allows students to execute cross-domain projects, explore the latest digitalisation tools, collaborate with industry partners and experience technology in the teaching and learning. \nEvery student has a choice to complete a 6-month or 1-year internship (JobReady Programme), Tourism Startup Internship Project or 1-year Business Digitalisation track, and will obtain a minor in an area of student?s choice through the personalised learning pathway.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-business-accountancy/diploma-in-tourism-resort-management",
  },
  {
    year: 2023,
    school: "School of Design & Environment",
    course_name: "Diploma in Design",
    course_code: "N12",
    course_description:
      "Diploma in Design (N12) has 2 specialisations: Architecture and Product Innovation. Students will acquire a broad based knowledge of design before specialising. The emphasis will be on Studio Based Learning.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-design-environment/diploma-in-design",
  },
  {
    year: 2023,
    school: "School of Design & Environment",
    course_name: "Diploma in Hotel & Leisure Facilities Management",
    course_code: "N40",
    course_description:
      "Diploma in Hotel & Leisure Facilities Management (N40) trains a new breed of hospitality and facility managers to manage modern facilities and bring them to a higher level of management.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-design-environment/diploma-in-hotel-leisure-facilities-management",
  },
  {
    year: 2023,
    school: "School of Design & Environment",
    course_name: "Diploma in Real Estate Business",
    course_code: "N48",
    course_description:
      "Diploma in Real Estate Business (N48) is the only one course of its kind amongst the polytechnics that trains you in both the business and management aspects of real estate.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-design-environment/diploma-in-real-estate-business",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Aerospace Engineering",
    course_code: "N65",
    course_description:
      "Diploma in Aerospace Engineering (N65) equips students with competencies in maintenance, repair and overhaul (MRO) of aircraft and related infrastructure. Our graduates have the option to specialize in either avionics or mechanical trade.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-aerospace-engineering",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Automation & Mechatronic Systems",
    course_code: "N50",
    course_description:
      "Diploma in Automation & Mechatronic Systems (N50) prepares students for careers in the automation industries. Students will learn to use automation and mechatronic technology to develop solutions for consumer products and industrial applications.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-automation-mechatronic-systems",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Biomedical Engineering",
    course_code: "N60",
    course_description:
      "Diploma in Biomedical Engineering (N60) provides a broad-based and practice-oriented training to design, develop and/or service medical devices and equipment, including body implants and rehabilitation products for the healthcare industry.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-biomedical-engineering",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Common Engineering Programme",
    course_code: "N71",
    course_description:
      "Common Engineering Programme (N71)�provides broad-based engineering foundation for students to choose either Mechanical or Electrical/Electronic track at end of 1st semester. Students learn modules of chosen track before deciding one of the 8 courses to major in at end of 2nd semester.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/common-engineering-programme",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Electrical Engineering",
    course_code: "N43",
    course_description:
      "Diploma in Electrical Engineering (N43) equips students with knowledge and skills to enter the growing and exciting clean energy and electrical industry. The Diploma has 2 specialisations: Clean Energy Management and Power Engineering.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-electrical-engineering",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Electronic & Computer Engineering",
    course_code: "N44",
    course_description:
      "Diploma in Electronic & Computer Engineering (N44) equips students with knowledge and skills in both Electronic and Computer foundations (especially in the core areas of circuit and system design, programming and computer networking) and emerging skills such as Internet of Things (IoTs) and Data Analytics.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-electronic-computer-engineering",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Engineering Science",
    course_code: "N93",
    course_description:
      "Diploma in Engineering Science (N93) bridges the gap between science and practical engineering.  It prepares graduates for future careers in research & development (R&D) and for further studies.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-engineering-science",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Marine & Offshore Technology",
    course_code: "N42",
    course_description:
      "Diploma in Marine & Offshore Technology (N42) equips students with the appropriate technical knowledge, management and communication skills to be assistant engineers, technologists or supervisors in the marine and offshore industry.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-marine-offshore-technology",
  },
  {
    year: 2023,
    school: "School of Engineering",
    course_name: "Diploma in Mechanical Engineering",
    course_code: "N41",
    course_description:
      "Diploma in Mechanical Engineering (N41) prepares students for industries like aerospace, marine, automotive, manufacturing and infrastructure. They will learn computer aided design, materials and manufacturing, automation, thermofluids and mechanics.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-engineering/diploma-in-mechanical-engineering",
  },
  {
    year: 2023,
    school: "School of Film & Media Studies",
    course_name: "Common Media Programme",
    course_code: "N14",
    course_description:
      "Common Media Programme (N14) provides a gateway into three diplomas in Singapore's original film and media school. Through the programme, students will be taught the media skills to set them on their way to becoming a multi-platform media practitioner. Students will take modules that will allow them to explore their interests in various media disciplines before ranking their choice of preferred film and media diplomas at the end of the first semester.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-film-media-studies/common-media-programme",
  },
  {
    year: 2023,
    school: "School of Film & Media Studies",
    course_name: "Diploma in Film, Sound & Video",
    course_code: "N82",
    course_description:
      "Diploma in Film, Sound & Video (N82) provides a strong foundational education in the artistic and technical aspects of filmmaking. Through the course, students will acquire skills to help them embark on their  career in the film, television and media industry.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-film-media-studies/diploma-in-film-sound-video",
  },
  {
    year: 2023,
    school: "School of Film & Media Studies",
    course_name: "Diploma in Mass Communication",
    course_code: "N67",
    course_description:
      "Diploma in Mass Communication (N67) prepares students for a career in the media industry by offering a robust broad-based curriculum covering advertising, public relations, design, journalism, radio, TV, and social media.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-film-media-studies/diploma-in-mass-communication",
  },
  {
    year: 2023,
    school: "School of Film & Media Studies",
    course_name: "Diploma in Media Post-Production",
    course_code: "N13",
    course_description:
      "Diploma in Media Post-Production (N13) covers traditional film and television post-production skills like editing, color correction and 3D computer and motion graphics. It will also cover post-production for AR/VR, immersive media and live shows.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-film-media-studies/diploma-in-media-post-production",
  },
  {
    year: 2023,
    school: "School of Health Sciences",
    course_name: "Diploma in Nursing",
    course_code: "N69",
    course_description:
      "Diploma in Nursing (N69) course is accredited by the Singapore Nursing Board (SNB) and prepares you to become a versatile nurse equipped with critical thinking and problem-solving skills. You will acquire the necessary knowledge and skills from relevant modules like Integrated Nursing Sciences and hands-on Nursing Laboratory lessons to prepare you for your Clinical Practice attachments in hospitals, which takes place over your 3 years of study. Upon graduation, you will be eligible to apply for a license from SNB to practise as a Registered Nurse. You can also tap into a wide range of career opportunities in the healthcare industries, locally and overseas.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-health-sciences/diploma-in-nursing",
  },
  {
    year: 2023,
    school: "School of Health Sciences",
    course_name: "Diploma in Optometry",
    course_code: "N83",
    course_description:
      "Diploma in Optometry (N83) course is accredited by the Optometrists and Opticians Board, and trains you to become a professional optometrist capable of diagnosing eye disorders and prescribing optical treatments to meet the increasing demand of eye care services arising from the aging population and high myopia prevalence in Singapore. In Year 2, you will apply your knowledge and skills for Clinical Practice at NP?s Optometry centre where you will examine public patients under the supervision of Registered Optometrists from the Industry. You will also go for Internship where you will be placed at two different optometry-related workplaces to gain real-world work experiences.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-health-sciences/diploma-in-optometry",
  },
  {
    year: 2023,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Arts Business Management",
    course_code: "N91",
    course_description:
      "Diploma in Arts Business Management (N91) develops arts and heritage managers with grounding in both arts and heritage management and business. Graduates will be equipped with the necessary skills needed to develop and manage arts and heritage enterprises.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-humanities-social-sciences/diploma-in-arts-business-management",
  },
  {
    year: 2023,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Chinese Media & Communication",
    course_code: "N88",
    course_description:
      "Diploma in Chinese Media & Communication (N88) is the only local programme that nurtures bilingual storytellers specialising in content production across media platforms, with sound understanding of the Chinese language and culture.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-humanities-social-sciences/diploma-in-chinese-media-communication",
  },
  {
    year: 2023,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Chinese Studies",
    course_code: "N70",
    course_description:
      "Diploma in Chinese Studies (N70) develops professionals who are proficient in Chinese language and culture, in two different areas - primary school teaching, or business. Graduates from the  course can work as Chinese primary school teachers, translators, heritage programme executives, or in organisations that deal with the Chinese markets.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-humanities-social-sciences/diploma-in-chinese-studies",
  },
  {
    year: 2023,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Community Development",
    course_code: "N11",
    course_description:
      "Diploma in Community Development (N11) aims to develop compassionate, enterprising, and reflective professionals with knowledge of the different segments of the community, and the principles of social innovation, psychology, and business management, to empower communities to effect change.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-humanities-social-sciences/diploma-in-community-development",
  },
  {
    year: 2023,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Early Childhood Development & Education",
    course_code: "N96",
    course_description:
      "Diploma in Early Childhood Development & Education (N96), recognised by the Early Childhood Development Agency (ECDA), aims to equip students with the practical skillset and necessary knowledge to pursue a career in early childhood.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-humanities-social-sciences/diploma-in-early-childhood-development-education",
  },
  {
    year: 2023,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Tamil Studies with Early Education",
    course_code: "N95",
    course_description:
      "Diploma in Tamil Studies with Early Education (N95) is the first and only such diploma course in Singapore which is also recognised by the Early Childhood Development Agency (ECDA). It provides students with the needed knowledge and skills to pursue a career as Tamil Language preschool teacher.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-humanities-social-sciences/diploma-in-tamil-studies-with-early-education",
  },
  {
    year: 2023,
    school: "School of InfoComm Technology",
    course_name: "Common ICT Programme",
    course_code: "N98",
    course_description:
      "Common ICT Programme (N98) provides students more time to discover their interests by taking foundation modules introducing the 4 ICT-related diplomas they can choose at the end of their first semester.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-infocomm-technology/common-ict-programme",
  },
  {
    year: 2023,
    school: "School of InfoComm Technology",
    course_name: "Diploma in Cybersecurity & Digital Forensics",
    course_code: "N94",
    course_description:
      "Diploma in Cybersecurity & Digital Forensics (N94) equips students with skills in vulnerability assessment & penetration testing, cyber defence, digital forensics investigation, secure software development, as well as cyber governance, risk & data protection using state-of-the-art lab facilities, and industry recognized cybersecurity tools.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-infocomm-technology/diploma-in-cybersecurity-digital-forensic",
  },
  {
    year: 2023,
    school: "School of InfoComm Technology",
    course_name: "Diploma in Data Science",
    course_code: "N81",
    course_description:
      "Diploma in Data Science (N81) equips students with the foundational skills and knowledge of data science, focussing on core concepts in data analytics, data engineering, machine learning and intelligent enterprise systems. Students will also get the opportunity to work on industry-led data science capstone projects, where they will experience the implementation of a real-life data science solution from start to the end.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-infocomm-technology/diploma-in-data-science",
  },
  {
    year: 2023,
    school: "School of InfoComm Technology",
    course_name: "Diploma in Immersive Media",
    course_code: "N55",
    course_description:
      "Diploma in Immersive Media (N55) is a practice-oriented course that equip you with the technical and creative skills needed for the cutting-edge field of immersive media, and learn how to bridge design and technology with user experience and user interface (UX/UI) design. You will receive rigorous training in design and programming, as well as gamification concepts and rules intended to produce an enjoyable game or extended reality experience (AR, VR & MR).",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-infocomm-technology/diploma-in-immersive-media",
  },
  {
    year: 2023,
    school: "School of InfoComm Technology",
    course_name: "Diploma in Information Technology",
    course_code: "N54",
    course_description:
      "Diploma in Information Technology (N54) equips you with a strong technical foundation with good grounding in core IT knowledge and skills for work or further study.  You will have the opportunity to develop innovative IT solutions that increase business competitiveness and enhance quality of life, or even start your very own e-business.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-infocomm-technology/diploma-in-information-technology",
  },
  {
    year: 2023,
    school: "School of Life Sciences & Chemical Technology",
    course_name: "Common Science Programme",
    course_code: "N15",
    course_description:
      "Common Science Programme (N15) provides broad-based science foundation for students to choose either Biomedical Science or Pharmaceutical Science at end of the first semester. Students will gain insights into the two diplomas through Diploma Exposure Programme, which will further guide them in making informed choices.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-life-sciences-chemical-technology/common-science-programme",
  },
  {
    year: 2023,
    school: "School of Life Sciences & Chemical Technology",
    course_name: "Diploma in Biomedical Science",
    course_code: "N59",
    course_description:
      "Diploma in Biomedical Science (N59) offers a broad-based curriculum to provide students with the necessary skills and knowledge for employment in the biologics manufacturing, food manufacturing, research & development, healthcare, and analytical services industries, as well as develop communication, problem solving, critical analysis, and digital literacy skills to meet the needs of employers in these industries.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-life-sciences-chemical-technology/diploma-in-biomedical-science",
  },
  {
    year: 2023,
    school: "School of Life Sciences & Chemical Technology",
    course_name: "Diploma in Chemical & Biomolecular Engineering",
    course_code: "N56",
    course_description:
      "Diploma in Chemical & Biomolecular Engineering (N56) equips students with the practical skillset and necessary knowledge for the operations of industrial chemical and biopharmaceutical processes.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-life-sciences-chemical-technology/diploma-in-chemical-biomolecular-engineering",
  },
  {
    year: 2023,
    school: "School of Life Sciences & Chemical Technology",
    course_name: "Diploma in Environmental & Water Technology",
    course_code: "N74",
    course_description:
      "Diploma in Environmental & Water Technology (N74) focuses on environmental science and technology to equip students with domain specific knowledge and skills in water, environment, sustainability and related industries.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-life-sciences-chemical-technology/diploma-in-environmental-water-technology",
  },
  {
    year: 2023,
    school: "School of Life Sciences & Chemical Technology",
    course_name: "Diploma in Landscape Design & Horticulture",
    course_code: "N57",
    course_description:
      "Diploma in Landscape Design & Horticulture (N57) provides broad based training in landscape design, plant sciences and horticulture management.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-life-sciences-chemical-technology/diploma-in-landscape-design-horticulture",
  },
  {
    year: 2023,
    school: "School of Life Sciences & Chemical Technology",
    course_name: "Diploma in Pharmaceutical Science",
    course_code: "N73",
    course_description:
      "Diploma in Pharmaceutical Science (N73) integrates Pharmacy Practice and Pharmaceutical Science Applications into one diploma. It allows students to discover about the forefront of drug discovery and development to the dispensing of medications for patients' health improvement.  Students will acquire knowledge and skills through practice-oriented training in clinical pharmacies and pharmaceutical companies, including workplace and contextualized on-the-job training.",
    reference:
      "https://www.np.edu.sg/schools-courses/academic-schools/school-of-life-sciences-chemical-technology/diploma-in-pharmaceutical-science",
  },
];

let COURSE_NP = RAW_COURSE_NP.filter(
  (rec) => rec.course_name.includes("Common") == false,
).map((rec) => ({
  id: rec.course_code,
  name: rec.course_name,
  polytechnicId: "np",
}));

const RAW_COURSE_NYP = [
  {
    academic_year: 2016,
    jae_course_code: "C39",
    course_name: "AEROSPACE / ELECTRICAL / ELECTRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C40",
    course_name: "AEROSPACE / MECHATRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN BUSINESS INTELLIGENCE & ANALYTICS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN MEDICINAL CHEMISTRY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL SCIENCES (SOCIAL WORK)",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C48",
    course_name: "DIPLOMA IN ELECTRICAL ENGINEERING WITH ECO-DESIGN",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C51",
    course_name: "AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C52",
    course_name: "AEROSPACE SYSTEMS & MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C53",
    course_name: "DIPLOMA IN TELEMATICS & MEDIA TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBER SECURITY & FORENSICS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C55",
    course_name: "DIPLOMA IN CHEMICAL & GREEN TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C56",
    course_name: "DIPLOMA IN FUND MANAGEMENT & ADMINISTRATION",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C57",
    course_name: "DIPLOMA IN DIGITAL VISUAL EFFECTS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C58",
    course_name: "DIPLOMA IN FINANCIAL INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C59",
    course_name: "DIPLOMA IN INTERACTION DESIGN",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C60",
    course_name: "DIPLOMA IN DIGITAL GAME ART & DESIGN",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C61",
    course_name: "DIPLOMA IN ANIMATION",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN DIGITAL & PRECISION ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C63",
    course_name: "DIPLOMA IN VISUAL COMMUNICATION",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C64",
    course_name: "DIPLOMA IN SPATIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCES",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C66",
    course_name: "DIPLOMA IN MOTION GRAPHICS & BROADCAST DESIGN",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C68",
    course_name: "DIPLOMA IN BUSINESS ENTERPRISE IT",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN DENTAL HYGIENE & THERAPY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C74",
    course_name: "DIPLOMA IN MOLECULAR BIOTECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN MULTIMEDIA & INFOCOMM TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C78",
    course_name: "DIPLOMA IN BUSINESS INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN ENGINEERING INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C83",
    course_name: "DIPLOMA IN INDUSTRIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C89",
    course_name:
      "DIPLOMA IN ELECTRONICS, COMPUTER & COMMUNICATIONS ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING & FINANCE",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "-",
  },
  {
    academic_year: 2016,
    jae_course_code: "C99",
    course_name: "DIPLOMA IN MARKETING",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C38",
    course_name: "DIPLOMA IN SUSTAINABLE ARCHITECTURAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C39",
    course_name: "AEROSPACE / ELECTRICAL / ELECTRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C40",
    course_name: "AEROSPACE / MECHATRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN BUSINESS INTELLIGENCE & ANALYTICS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN MEDICINAL CHEMISTRY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL SCIENCES (SOCIAL WORK)",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C48",
    course_name: "DIPLOMA IN ELECTRICAL ENGINEERING WITH ECO-DESIGN",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C51",
    course_name: "DIPLOMA IN AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C52",
    course_name: "DIPLOMA IN AEROSPACE SYSTEMS & MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C53",
    course_name: "DIPLOMA IN TELEMATICS & MEDIA TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBER SECURITY & FORENSICS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C55",
    course_name: "DIPLOMA IN CHEMICAL & GREEN TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C56",
    course_name: "DIPLOMA IN FUND MANAGEMENT & ADMINISTRATION",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C57",
    course_name: "DIPLOMA IN DIGITAL VISUAL EFFECTS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C58",
    course_name: "DIPLOMA IN FINANCIAL INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C59",
    course_name: "DIPLOMA IN INTERACTION DESIGN",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C60",
    course_name: "DIPLOMA IN DIGITAL GAME ART & DESIGN",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C61",
    course_name: "DIPLOMA IN ANIMATION",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN DIGITAL & PRECISION ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C63",
    course_name: "DIPLOMA IN VISUAL COMMUNICATION",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C64",
    course_name: "DIPLOMA IN SPATIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCES",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C66",
    course_name: "DIPLOMA IN MOTION GRAPHICS & BROADCAST DESIGN",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C68",
    course_name: "DIPLOMA IN BUSINESS ENTERPRISE IT",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN ORAL HEALTH THERAPY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C74",
    course_name: "DIPLOMA IN MOLECULAR BIOTECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN MULTIMEDIA & INFOCOMM TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C78",
    course_name: "DIPLOMA IN BUSINESS INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN INFOCOMM AND SECURITY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C83",
    course_name: "DIPLOMA IN INDUSTRIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C89",
    course_name: "DIPLOMA IN ELECTRONIC SYSTEMS",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING & FINANCE",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "-",
  },
  {
    academic_year: 2017,
    jae_course_code: "C99",
    course_name: "DIPLOMA IN MARKETING",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C38",
    course_name: "DIPLOMA IN SUSTAINABLE ARCHITECTURAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C39",
    course_name: "AEROSPACE/ ELECTRICAL/ ELECTRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C40",
    course_name: "AEROSPACE/MECHATRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN BUSINESS INTELLIGENCE & ANALYTICS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN MEDICINAL CHEMISTRY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL SCIENCES (SOCIAL WORK)",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C48",
    course_name: "DIPLOMA IN ELECTRICAL ENGINEERING WITH ECO-DESIGN",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C51",
    course_name: "DIPLOMA IN AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C52",
    course_name: "DIPLOMA IN AEROSPACE SYSTEMS & MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBER SECURITY & FORENSICS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C55",
    course_name: "DIPLOMA IN CHEMICAL & GREEN TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C57",
    course_name: "DIPLOMA IN DIGITAL VISUAL EFFECTS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C58",
    course_name: "DIPLOMA IN FINANCIAL INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C59",
    course_name: "DIPLOMA IN INTERACTION DESIGN",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C60",
    course_name: "DIPLOMA IN DIGITAL GAME ART & DESIGN",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C61",
    course_name: "DIPLOMA IN ANIMATION",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN DIGITAL & PRECISION ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C63",
    course_name: "DIPLOMA IN VISUAL COMMUNICATION",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C64",
    course_name: "DIPLOMA IN SPATIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCES",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C66",
    course_name: "DIPLOMA IN MOTION GRAPHICS & BROADCAST DESIGN",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN ORAL HEALTH THERAPY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C74",
    course_name: "DIPLOMA IN MOLECULAR BIOTECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN MULTIMEDIA & INFOCOMM TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C78",
    course_name: "DIPLOMA IN BUSINESS INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN INFOCOMM AND SECURITY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C83",
    course_name: "DIPLOMA IN INDUSTRIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C87",
    course_name: "DIPLOMA IN ROBOTICS & MECHATRONICS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C89",
    course_name: "DIPLOMA IN ELECTRONIC SYSTEMS",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING & FINANCE",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "-",
  },
  {
    academic_year: 2018,
    jae_course_code: "C99",
    course_name: "DIPLOMA IN MARKETING",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C34",
    course_name: "COMMON BUSINESS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C35",
    course_name: "DIPLOMA IN BUSINESS & FINANCIAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C36",
    course_name: "COMMON ICT PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C38",
    course_name: "DIPLOMA IN ARCHITECTURE",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C39",
    course_name: "AEROSPACE / ELECTRICAL / ELECTRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C40",
    course_name: "AEROSPACE / MECHATRONICS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN BUSINESS INTELLIGENCE & ANALYTICS",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN MEDICINAL CHEMISTRY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL SCIENCES (SOCIAL WORK)",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C48",
    course_name: "DIPLOMA IN ELECTRICAL ENGINEERING WITH ECO-DESIGN",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C51",
    course_name: "DIPLOMA IN AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C52",
    course_name: "DIPLOMA IN AEROSPACE SYSTEMS & MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBER SECURITY & FORENSICS",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C57",
    course_name: "DIPLOMA IN DIGITAL VISUAL EFFECTS",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C59",
    course_name: "DIPLOMA IN INTERACTION DESIGN",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C60",
    course_name: "DIPLOMA IN DIGITAL GAME ART & DESIGN",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C61",
    course_name: "DIPLOMA IN ANIMATION",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN DIGITAL & PRECISION ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C63",
    course_name: "DIPLOMA IN VISUAL COMMUNICATION",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C64",
    course_name: "DIPLOMA IN SPATIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCES",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C66",
    course_name: "DIPLOMA IN MOTION GRAPHICS & BROADCAST DESIGN",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN DENTAL HYGIENE & THERAPY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C74",
    course_name: "DIPLOMA IN MOLECULAR BIOTECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN MULTIMEDIA & INFOCOMM TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN ENGINEERING INFORMATICS",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C83",
    course_name: "DIPLOMA IN INDUSTRIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C87",
    course_name: "DIPLOMA IN MECHATRONICS ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C89",
    course_name:
      "DIPLOMA IN ELECTRONICS, COMPUTER & COMMUNICATIONS ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING & FINANCE",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "-",
  },
  {
    academic_year: 2019,
    jae_course_code: "C99",
    course_name: "DIPLOMA IN MARKETING",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C33",
    course_name: "DIPLOMA IN ANIMATION & VISUAL EFFECTS",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C34",
    course_name: "COMMON BUSINESS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C35",
    course_name: "DIPLOMA IN BUSINESS & FINANCIAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C36",
    course_name: "COMMON ICT PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C38",
    course_name: "DIPLOMA IN ARCHITECTURE",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN BUSINESS INTELLIGENCE & ANALYTICS",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN MEDICINAL CHEMISTRY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL SCIENCES (SOCIAL WORK)",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C51",
    course_name: "DIPLOMA IN AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C52",
    course_name: "DIPLOMA IN AEROSPACE SYSTEMS & MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBERSECURITY & DIGITAL FORENSICS",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C59",
    course_name: "DIPLOMA IN INTERACTION DESIGN",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C60",
    course_name: "DIPLOMA IN DIGITAL GAME ART & DESIGN",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN ADVANCED & DIGITAL MANUFACTURING",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C63",
    course_name: "DIPLOMA IN VISUAL COMMUNICATION",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C64",
    course_name: "DIPLOMA IN SPATIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCE",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C66",
    course_name: "DIPLOMA IN MOTION GRAPHICS DESIGN",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN ORAL HEALTH THERAPY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN INFOCOMM & MEDIA ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN INFOCOMM & SECURITY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C83",
    course_name: "DIPLOMA IN INDUSTRIAL DESIGN",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C87",
    course_name: "DIPLOMA IN ROBOTICS & MECHATRONICS",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C89",
    course_name: "DIPLOMA IN ELECTRONIC & COMPUTER ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING AND FINANCE",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "-",
  },
  {
    academic_year: 2020,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C32",
    course_name: "DIPLOMA IN EXPERIENTIAL PRODUCT & INTERIOR DESIGN",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C33",
    course_name: "DIPLOMA IN ANIMATION & VISUAL EFFECTS",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C34",
    course_name: "COMMON BUSINESS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C35",
    course_name: "DIPLOMA IN BUSINESS & FINANCIAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C36",
    course_name: "COMMON ICT PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C38",
    course_name: "DIPLOMA IN ARCHITECTURE",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN BUSINESS INTELLIGENCE & ANALYTICS",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN APPLIED CHEMISTRY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL WORK",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C51",
    course_name: "DIPLOMA IN AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C52",
    course_name: "DIPLOMA IN AEROSPACE SYSTEMS & MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBERSECURITY & DIGITAL FORENSICS",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C59",
    course_name: "DIPLOMA IN INTERACTION DESIGN",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C60",
    course_name: "DIPLOMA IN DIGITAL GAME ART & DESIGN",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN ADVANCED & DIGITAL MANUFACTURING",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C63",
    course_name: "DIPLOMA IN VISUAL COMMUNICATION",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCE",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C66",
    course_name: "DIPLOMA IN MOTION GRAPHICS DESIGN",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN ORAL HEALTH THERAPY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN INFOCOMM & MEDIA ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN INFOCOMM & SECURITY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C87",
    course_name: "DIPLOMA IN ROBOTICS & MECHATRONICS",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C89",
    course_name: "DIPLOMA IN ELECTRONIC & COMPUTER ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING AND FINANCE",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "-",
  },
  {
    academic_year: 2021,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C31",
    course_name: "DIPLOMA IN AI & DATA ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C32",
    course_name: "DIPLOMA IN EXPERIENTIAL PRODUCT & INTERIOR DESIGN",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C33",
    course_name: "DIPLOMA IN ANIMATION & VISUAL EFFECTS",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C34",
    course_name: "COMMON BUSINESS PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C35",
    course_name: "DIPLOMA IN BUSINESS & FINANCIAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C36",
    course_name: "COMMON ICT PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C38",
    course_name: "DIPLOMA IN ARCHITECTURE",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN BUSINESS INTELLIGENCE & ANALYTICS",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN APPLIED CHEMISTRY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL WORK",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C51",
    course_name: "DIPLOMA IN AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C52",
    course_name: "DIPLOMA IN AEROSPACE SYSTEMS & MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBERSECURITY & DIGITAL FORENSICS",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C59",
    course_name: "DIPLOMA IN INTERACTION DESIGN",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C60",
    course_name: "DIPLOMA IN DIGITAL GAME ART & DESIGN",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN ADVANCED & DIGITAL MANUFACTURING",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C63",
    course_name: "DIPLOMA IN VISUAL COMMUNICATION",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCE",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C66",
    course_name: "DIPLOMA IN MOTION GRAPHICS DESIGN",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN ORAL HEALTH THERAPY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN INFOCOMM & MEDIA ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN INFOCOMM & SECURITY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C87",
    course_name: "DIPLOMA IN ROBOTICS & MECHATRONICS",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C89",
    course_name: "DIPLOMA IN ELECTRONIC & COMPUTER ENGINEERING",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING AND FINANCE",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "-",
  },
  {
    academic_year: 2022,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "-",
  },
  {
    academic_year: 2023,
    jae_course_code: "C27",
    course_name: "COMMON SCIENCE PROGRAMME",
    url: "https://www.nyp.edu.sg/schools/sas/full-time-courses/common-science-programme.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C28",
    course_name: "COMMON DESIGN & MEDIA PROGRAMME",
    url: "https://www.nyp.edu.sg/schools/sdm/full-time-courses/common-media-design-programme.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C29",
    course_name: "DIPLOMA IN ANIMATION, GAMES & VISUAL EFFECTS",
    url: "https://www.nyp.edu.sg/schools/sdm/full-time-courses/animation-games-visual-effects.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C30",
    course_name: "DIPLOMA IN COMMUNICATION & MOTION DESIGN",
    url: "https://www.nyp.edu.sg/schools/sdm/full-time-courses/communication-and-motion-design.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C31",
    course_name: "DIPLOMA IN AI & DATA ENGINEERING",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/ai-and-data-engineering.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C32",
    course_name: "DIPLOMA IN EXPERIENTIAL PRODUCT & INTERIOR DESIGN",
    url: "https://www.nyp.edu.sg/schools/sdm/full-time-courses/experiential-product-and-interior-design.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C34",
    course_name: "COMMON BUSINESS PROGRAMME",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/common-business-programme.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C35",
    course_name: "DIPLOMA IN BUSINESS & FINANCIAL TECHNOLOGY",
    url: "https://www.nyp.edu.sg/schools/sit/full-time-courses/business-and-financial-technology.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C36",
    course_name: "COMMON ICT PROGRAMME",
    url: "https://www.nyp.edu.sg/schools/sit/full-time-courses/common-ict-programme.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C38",
    course_name: "DIPLOMA IN ARCHITECTURE",
    url: "https://www.nyp.edu.sg/schools/sdm/full-time-courses/architecture.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C41",
    course_name: "DIPLOMA IN ENGINEERING WITH BUSINESS",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/engineering-with-business.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C42",
    course_name: "COMMON ENGINEERING PROGRAMME",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/common-engineering-programme.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C43",
    course_name: "DIPLOMA IN APPLIED AI & ANALYTICS",
    url: "https://www.nyp.edu.sg/schools/sit/full-time-courses/applied-ai-and-analytics.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C45",
    course_name: "DIPLOMA IN APPLIED CHEMISTRY",
    url: "https://www.nyp.edu.sg/schools/sas/full-time-courses/applied-chemistry.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C46",
    course_name: "DIPLOMA IN FOOD & BEVERAGE BUSINESS",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/food-and-beverage-business.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C47",
    course_name: "DIPLOMA IN SOCIAL WORK",
    url: "https://www.nyp.edu.sg/schools/shss/full-time-courses/social-work.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C49",
    course_name: "DIPLOMA IN BIOLOGICS & PROCESS TECHNOLOGY",
    url: "https://www.nyp.edu.sg/schools/sas/full-time-courses/biologics-and-process-technology.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C50",
    course_name: "DIPLOMA IN NANOTECHNOLOGY & MATERIALS SCIENCE",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/nanotechnology-and-materials-science.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C51",
    course_name: "DIPLOMA IN AERONAUTICAL & AEROSPACE TECHNOLOGY",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/aeronautical-and-aerospace-technology.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C52",
    course_name: "DIPLOMA IN AEROSPACE SYSTEMS & MANAGEMENT",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/aerospace-systems-and-management.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C54",
    course_name: "DIPLOMA IN CYBERSECURITY & DIGITAL FORENSICS",
    url: "https://www.nyp.edu.sg/schools/sit/full-time-courses/cybersecurity-and-digital-forensics.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C62",
    course_name: "DIPLOMA IN ADVANCED & DIGITAL MANUFACTURING",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/advanced-and-digital-manufacturing.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C65",
    course_name: "DIPLOMA IN PHARMACEUTICAL SCIENCE",
    url: "https://www.nyp.edu.sg/schools/sas/full-time-courses/pharmaceutical-science.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C67",
    course_name: "DIPLOMA IN HOSPITALITY & TOURISM MANAGEMENT",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/hospitality-and-tourism-management.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C69",
    course_name: "DIPLOMA IN FOOD SCIENCE & NUTRITION",
    url: "https://www.nyp.edu.sg/schools/sas/full-time-courses/food-science-and-nutrition.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C70",
    course_name: "DIPLOMA IN GAME DEVELOPMENT & TECHNOLOGY",
    url: "https://www.nyp.edu.sg/schools/sdm/full-time-courses/game-development-and-technology.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C71",
    course_name: "DIPLOMA IN BIOMEDICAL ENGINEERING",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/biomedical-engineering.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C72",
    course_name: "DIPLOMA IN ORAL HEALTH THERAPY",
    url: "https://www.nyp.edu.sg/schools/shss/full-time-courses/oral-health-therapy.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C73",
    course_name: "DIPLOMA IN CHEMICAL & PHARMACEUTICAL TECHNOLOGY",
    url: "https://www.nyp.edu.sg/schools/sas/full-time-courses/chemical-and-pharmaceutical-technology.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C75",
    course_name: "DIPLOMA IN INFOCOMM & MEDIA ENGINEERING",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/infocomm-and-media-engineering.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C80",
    course_name: "DIPLOMA IN INFOCOMM & SECURITY",
    url: "https://www.nyp.edu.sg/schools/sit/full-time-courses/infocomm-and-security.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C81",
    course_name: "DIPLOMA IN SPORT & WELLNESS MANAGEMENT",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/sports-and-wellness.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C85",
    course_name: "DIPLOMA IN INFORMATION TECHNOLOGY",
    url: "https://www.nyp.edu.sg/schools/sit/full-time-courses/information-technology.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C87",
    course_name: "DIPLOMA IN ROBOTICS & MECHATRONICS",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/robotics-and-mechatronics.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C89",
    course_name: "DIPLOMA IN ELECTRONIC & COMPUTER ENGINEERING",
    url: "https://www.nyp.edu.sg/schools/seg/full-time-courses/electronic-computer-engineering.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C93",
    course_name: "DIPLOMA IN MASS MEDIA MANAGEMENT",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/mass-media-management.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C94",
    course_name: "DIPLOMA IN BUSINESS MANAGEMENT",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/business-management.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C96",
    course_name: "DIPLOMA IN BANKING AND FINANCE",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/banking-and-finance.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C97",
    course_name: "DIPLOMA IN NURSING",
    url: "https://www.nyp.edu.sg/schools/shss/full-time-courses/nursing.html",
  },
  {
    academic_year: 2023,
    jae_course_code: "C98",
    course_name: "DIPLOMA IN ACCOUNTANCY & FINANCE",
    url: "https://www.nyp.edu.sg/schools/sbm/full-time-courses/accountancy-and-finance.html",
  },
];

let COURSE_NYP = RAW_COURSE_NYP.filter((rec) => rec.academic_year == 2023)
  .filter((rec) => rec.course_name.includes("COMMON") == false)
  .map((rec) => ({
    id: rec.jae_course_code,
    name: rec.course_name,
    polytechnicId: "nyp",
  }));

const RAW_COURSE_TP = [
  {
    year: 2022,
    school: "School of Applied Science",
    course_name: "Diploma in Pharmaceutical Science",
    moe_course_code: "T25",
    poly_course_code: "A0L",
    course_description:
      "Provides skilled manpower not only in the healthcare sector, in particular the hospital and retail pharmacies, but also pharmaceutical industry. Besides medication use, training also extends to R&D, pharmaceutical manufacturing, pharmaceutical analysis and pharmaceutical sales and marketing.",
    reference: "https://www.tp.edu.sg/schools/asc/pharmaceutical-science",
  },
  {
    year: 2022,
    school: "School of Applied Science",
    course_name: "Diploma in Food, Nutrition & Culinary Science",
    moe_course_code: "T26",
    poly_course_code: "A0N",
    course_description:
      "The course trains you in the areas of food production, healthier food product development, food safety and applied nutrition. You would also pick up basic culinary, baking and product development skills.",
    reference:
      "https://www.tp.edu.sg/schools/asc/food-nutrition-and-culinary-science",
  },
  {
    year: 2022,
    school: "School of Applied Science",
    course_name: "Diploma in Chemical Engineering",
    moe_course_code: "T33",
    poly_course_code: "A0D",
    course_description:
      "Trains skilled manpower for the needs of the Chemical, Pharmaceutical and Semiconductor Industries.  Graduates will also be equipped with fundamental and applied chemistry knowledge to work in research and testing laboratories.",
    reference: "https://www.tp.edu.sg/schools/asc/chemical-engineering",
  },
  {
    year: 2022,
    school: "School of Applied Science",
    course_name: "Diploma in Veterinary Technology",
    moe_course_code: "T45",
    poly_course_code: "A0K",
    course_description:
      "Provides you with knowledge and skills in animal care, and prepares you for the biomedical, aquaculture, veterinary and pet industries.",
    reference: "https://www.tp.edu.sg/schools/asc/veterinary-technology",
  },
  {
    year: 2022,
    school: "School of Applied Science",
    course_name: "Diploma in Medical Biotechnology",
    moe_course_code: "T64",
    poly_course_code: "A0M",
    course_description:
      "Provides skilled manpower not only in the biomedical sciences but also biotechnology industries, particularly in clinical services, technical support, product development and bioanalytical services.",
    reference: "https://www.tp.edu.sg/schools/asc/medical-biotechnology",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Common Business Programme",
    moe_course_code: "T01",
    poly_course_code: "B0Q",
    course_description:
      "Designed to help you explore various business disciplines. At the end of one semester, you will make an informed decision by ranking your preferred choices of 7 business diplomas.",
    reference: "https://www.tp.edu.sg/schools/bus/common-business-programme",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in Accountancy & Finance",
    moe_course_code: "T02",
    poly_course_code: "B0R",
    course_description:
      "Equips you with core business competencies and professional training that position you to thrive in both the accountancy profession and the financial services industry.",
    reference: "https://www.tp.edu.sg/schools/bus/accountancy-and-finance",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in International Trade & Logistics",
    moe_course_code: "T07",
    poly_course_code: "B0S",
    course_description:
      "With more consumers turning to e-commerce and international trade becoming more complex, the demand for logistics professionals has never been greater.\n\nYour industry readiness will be ensured through a firm foundation in business studies and specialised supply chain training to meet the demands of a technology-driven business environment and globalised world.",
    reference:
      "https://www.tp.edu.sg/schools-and-courses/students/schools/bus/international-trade-and-logistics.html",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in Hospitality & Tourism Management",
    moe_course_code: "T08",
    poly_course_code: "B0K",
    course_description:
      "This course allows you to widen your career options and be globally marketable. Unlock skills to create memorable customer experiences, trot the globe to deepen cross cultural experiences, and accelerate your job experiences in the Hospitality & Tourism (H&T) context. Stand out as a H&T superhost with the passion to meet people; agile and flexible problem solving skills to navigate tourism jobs of tomorrow.",
    reference:
      "https://www.tp.edu.sg/schools/bus/hospitality-and-tourism-management",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in Law & Management",
    moe_course_code: "T09",
    poly_course_code: "B0G",
    course_description:
      "A niche course offered only at Temasek Polytechnic that prepares you to join the legal industry as allied legal professionals.",
    reference: "https://www.tp.edu.sg/schools/bus/law-and-management",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in Business",
    moe_course_code: "T10",
    poly_course_code: "B0C",
    course_description:
      "A broad-based diploma that offers you the choice to deepen your skills in one of 4 specialisations - Banking and Finance, Digital Business Innovation, Human Resource Management with Psychology or International Business and Entrepreneurship.",
    reference: "https://www.tp.edu.sg/schools/bus/business",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in Culinary & Catering Management",
    moe_course_code: "T18",
    poly_course_code: "B0M",
    course_description:
      "A pioneering culinary diploma in collaboration with the reputed Culinary Institute of America (CIA) that provides students with solid F&B business fundamentals before specialising in either Baking and Pastry or Culinary Arts.",
    reference:
      "https://www.tp.edu.sg/schools/bus/culinary-and-catering-management",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in Communications & Media Management",
    moe_course_code: "T40",
    poly_course_code: "B0E",
    course_description:
      "Trains you in journalism and content creation for broadcast and digital media. You will learn to integrate marketing and technical skills to develop a business mindset for media operations.",
    reference:
      "https://www.tp.edu.sg/schools/bus/communications-and-media-management",
  },
  {
    year: 2022,
    school: "School of Business",
    course_name: "Diploma in Marketing",
    moe_course_code: "T67",
    poly_course_code: "B0I",
    course_description:
      "Gives you a strong foundation in marketing and key competencies in marketing analytics and consumer insights and allows you to specialise in either Branding and Digital Marketing or E-commerce and Retail Marketing.",
    reference: "https://www.tp.edu.sg/schools/bus/marketing",
  },
  {
    year: 2022,
    school: "School of Design",
    course_name: "Diploma in Apparel Design & Merchandising",
    moe_course_code: "T20",
    poly_course_code: "D0C",
    course_description:
      "Gives a broad overview of the fashion industry and the fashion life cycle from concept creation, design and production to marketing, brand storytelling and distribution. You can specialise in either fashion design or retail merchandising.",
    reference:
      "https://www.tp.edu.sg/schools/des/apparel-design-and-merchandising",
  },
  {
    year: 2022,
    school: "School of Design",
    course_name: "Diploma in Interior Architecture & Design",
    moe_course_code: "T22",
    poly_course_code: "D0A",
    course_description:
      "Focuses on the creation of innovative and exciting interior spaces, primarily through the adaptation and spatial manipulation of existing buildings. It emphasises a unique combination of architecture and interior design principles to create beautiful and liveable spaces for 21st century lifestyles.",
    reference:
      "https://www.tp.edu.sg/schools/des/interior-architecture-and-design",
  },
  {
    year: 2022,
    school: "School of Design",
    course_name: "Diploma in Digital Film & Television",
    moe_course_code: "T23",
    poly_course_code: "D0J",
    course_description:
      "An award-winning course that emphasises the creative and technical aspects of compelling story-telling through film and video while immersing students in the business end of film-making.",
    reference: "https://www.tp.edu.sg/schools/des/digital-film-and-television",
  },
  {
    year: 2022,
    school: "School of Design",
    course_name: "Diploma in Product & Industrial Design",
    moe_course_code: "T35",
    poly_course_code: "D0E",
    course_description:
      "Focuses on creating impactful and meaningful solutions in product and experience design through the use of human-centred design principles with cutting edge technology in prototyping and production.",
    reference:
      "https://www.tp.edu.sg/schools-and-courses/students/schools/des/product-experience-and-design.html",
  },
  {
    year: 2022,
    school: "School of Design",
    course_name: "Diploma in Communication Design",
    moe_course_code: "T59",
    poly_course_code: "D0K",
    course_description:
      "An award-winning pioneer in visual communication focused on crafting delightful experiences through the integration of design, business and technology. The future is yours to design.",
    reference: "https://www.tp.edu.sg/schools/des/communication-design",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Aviation Management",
    moe_course_code: "T04",
    poly_course_code: "E1G",
    course_description:
      "Gives you specialised aviation management skills and business knowledge to manage world class airports and airlines.  You will have various internship opportunities with CAAS, CAG, SIA, Cathay Pacific and Scoot.",
    reference: "https://www.tp.edu.sg/schools/eng/aviation-management",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Computer Engineering",
    moe_course_code: "T13",
    poly_course_code: "E0C",
    course_description:
      "Trains you in hardware, software and how to integrate them, to make you an enabler of today's technologies such as the Internet of Things, artificial intelligence, smart systems, and big data.",
    reference: "https://www.tp.edu.sg/schools/eng/computer-engineering",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Integrated Facility Management",
    moe_course_code: "T28",
    poly_course_code: "E0W",
    course_description:
      "Trains you to manage the features, amenities, aesthetics and functionality of modern facilities such as IRs, airports, business/convention centres, offices, entertainment hubs, and tourist attractions.",
    reference:
      "https://www.tp.edu.sg/schools/eng/integrated-facility-management",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Architectural Technology & Building Services",
    moe_course_code: "T29",
    poly_course_code: "E1H",
    course_description:
      "An inter-disciplinary course that integrates sustainability in architectural design and technology in building systems. It also equips you with energy management core competencies  that position you to thrive in both the architectural profession and the sustainable built environment industry.",
    reference:
      "https://www.tp.edu.sg/schools/eng/architectural-technology-and-building-services",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Biomedical Engineering",
    moe_course_code: "T38",
    poly_course_code: "E1F",
    course_description:
      "An inter-disciplinary course that trains you in biological techniques and biomedical instrumentation and their usage in the human body, allowing you to tap into the growing MedTech and healthcare sectors.",
    reference: "https://www.tp.edu.sg/schools/eng/biomedical-engineering",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Business Process & Systems Engineering",
    moe_course_code: "T43",
    poly_course_code: "E0K",
    course_description:
      "Infuses business concepts and management principles into a core of engineering fundamentals;  this will make you a multi-disciplinary professional with versatile career prospects and further study options.",
    reference:
      "https://www.tp.edu.sg/schools/eng/business-process-and-systems-engineering",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Aerospace Electronics",
    moe_course_code: "T50",
    poly_course_code: "E0U",
    course_description:
      "Focuses on avionics. TP is the first local Poly certified by CAAS as a SAR-147 Approved Maintenance Training Organisation, so your diploma is more widely recognised by aerospace-related industries.",
    reference: "https://www.tp.edu.sg/schools/eng/aerospace-electronics",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Aerospace Engineering",
    moe_course_code: "T51",
    poly_course_code: "E0T",
    course_description:
      "Focuses on aircraft design and engine systems. TP is the first local Poly certified by CAAS as a SAR-147 Approved Maintenance Training Organisation, so your diploma is more widely recognised by aerospace-related industries.",
    reference: "https://www.tp.edu.sg/schools/eng/aerospace-engineering",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Common Engineering Programme",
    moe_course_code: "T56",
    poly_course_code: "E1C",
    course_description:
      "Gives you time to find out your interests before choosing 1 out of 7 courses, including our highly popular diplomas, in semester 1 or 2.  Ultimately, you will graduate with the same diploma within 3 years.",
    reference: "https://www.tp.edu.sg/schools/eng/common-engineering-programme",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Electronics",
    moe_course_code: "T65",
    poly_course_code: "E0E",
    course_description:
      "Equips you with knowledge of electronic circuits and systems to enable you  to develop and manage high-tech automated systems and advanced manufacturing processes amidst today's digital transformation.",
    reference: "https://www.tp.edu.sg/schools/eng/electronics",
  },
  {
    year: 2022,
    school: "School of Engineering",
    course_name: "Diploma in Mechatronics",
    moe_course_code: "T66",
    poly_course_code: "E0M",
    course_description:
      "Trains you to integrate mechanical engineering with electronics to come up with intelligent systems used in engineering applications such as robotics, automation, smart manufacturing and even aerospace systems.",
    reference: "https://www.tp.edu.sg/schools/eng/mechatronics",
  },
  {
    year: 2022,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Psychology Studies",
    moe_course_code: "T48",
    poly_course_code: "G0A",
    course_description:
      "Provides a foundational knowledge of human behaviour. It also equips students to apply psychology in professional settings, such as the social services, special needs education and research sectors.",
    reference: "https://www.tp.edu.sg/schools/hss/psychology-studies",
  },
  {
    year: 2022,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Social Sciences in Gerontology",
    moe_course_code: "T53",
    poly_course_code: "G0F",
    course_description:
      "The only diploma in Singapore that seeks to prepare students for rewarding careers in the health, community and social service sectors, to support and empower older adults of different abilities.",
    reference:
      "https://www.tp.edu.sg/schools/hss/social-sciences-in-gerontology",
  },
  {
    year: 2022,
    school: "School of Humanities & Social Sciences",
    course_name: "Diploma in Early Childhood Development & Education",
    moe_course_code: "T68",
    poly_course_code: "G0E",
    course_description:
      "Recognised by the Early Childhood Development Agency (ECDA), this course aims to equip students with the practical skillset and necessary knowledge to pursue a career in early childhood.",
    reference:
      "https://www.tp.edu.sg/schools/hss/early-childhood-development-and-education",
  },
  {
    year: 2022,
    school: "School of Informatics & IT",
    course_name: "Diploma in Information Technology",
    moe_course_code: "T30",
    poly_course_code: "C0B",
    course_description:
      "Gives you a solid foundation in software development, a good understanding of Agile Methodology, DevOps , Cloud Computing,  Artificial Intelligence (AI) and the skills to create applications across multiple platforms for businesses.",
    reference: "https://www.tp.edu.sg/schools/iit/information-technology",
  },
  {
    year: 2022,
    school: "School of Informatics & IT",
    course_name: "Diploma in Game Design & Development",
    moe_course_code: "T58",
    poly_course_code: "C0P",
    course_description:
      "Keen to create your own exciting games with interactive content leveraging on immersive media technologies? Then this course would be right up your alley!\n\nGain a strong understanding of how to merge the virtual and physical worlds using sound game design and development principles. Create your own game from conception to design, development and deployment. Get the opportunity to learn from and work alongside experts who’ve created augmented reality, virtual reality, and video game titles for industries such as healthcare, hospitality, manufacturing, and education. Our use of industry-leading tools from Unity will also give you a unique advantage. At the same time, earn recognised and valued immersive media and game industry professional certifications while learning with us.\n\nTake your passion for game development to the next level through this exciting and engaging course in  Immersive Media & Game Development.",
    reference:
      "https://www.tp.edu.sg/schools-and-courses/students/schools/iit/immersive-media-and-game-development.html",
  },
  {
    year: 2022,
    school: "School of Informatics & IT",
    course_name: "Diploma in Big Data & Analytics",
    moe_course_code: "T60",
    poly_course_code: "C0S",
    course_description:
      "Equips you with highly sought-after skills to manage big data and to make sense of data by using analytics. In this way you can help businesses and organisations make smarter decisions.",
    reference: "https://www.tp.edu.sg/schools/iit/big-data-and-analytics",
  },
  {
    year: 2022,
    school: "School of Informatics & IT",
    course_name: "Diploma in Cybersecurity & Digital Forensics",
    moe_course_code: "T62",
    poly_course_code: "C0R",
    course_description:
      "Trains you to be a cybersecurity professional with the skills to protect organisations against cyber security threats and the ability to investigate cyber crimes.",
    reference:
      "https://www.tp.edu.sg/schools/iit/cybersecurity-and-digital-forensics",
  },
  {
    year: 2022,
    school: "School of Informatics & IT",
    course_name: "Common ICT Programme",
    moe_course_code: "T63",
    poly_course_code: "C0T",
    course_description:
      "A 1 year programme that provides you an excellent foundation in ICT, giving you time to discover more about our diploma courses before you make your choice of what to pursue in Year 2.",
    reference: "https://www.tp.edu.sg/schools/iit/common-ict-programme",
  },
  {
    year: 2022,
    school: "School of Informatics & IT",
    course_name: "Diploma in Applied Artificial Intelligence",
    moe_course_code: "T69",
    poly_course_code: "C0U",
    course_description:
      "Learn to develop chatbots, leverage on natural language processing technologies to translate information from one language to another, undertake object recognition projects that enable you to identify objects such as car plate numbers, and learn to use machine learning and deep learning algorithms to develop creative new solutions for businesses and industry.",
    reference:
      "https://www.tp.edu.sg/schools/iit/applied-artificial-intelligence",
  },
];

let COURSE_TP = RAW_COURSE_TP.filter(
  (rec) => rec.course_name.includes("Common") == false,
).map((rec) => ({
  id: rec.moe_course_code,
  name: rec.course_name,
  polytechnicId: "tp",
}));

const RAW_COURSE_RP = [
  {
    year: 2019,
    school: "School of Applied Science",
    course_name: "Diploma in Biomedical Science",
    course_abbreviation: "DBMS",
    course_code: "R14",
    reference:
      "https://www.rp.edu.sg/SAS/full-time-diplomas/Details/diploma-in-biomedical-science",
  },
  {
    year: 2019,
    school: "School of Applied Science",
    course_name: "Diploma in Biotechnology",
    course_abbreviation: "DBIO",
    course_code: "R16",
    reference:
      "https://www.rp.edu.sg/SAS/full-time-diplomas/Details/diploma-in-biotechnology",
  },
  {
    year: 2019,
    school: "School of Applied Science",
    course_name: "Diploma in Environmental Science",
    course_abbreviation: "DENV",
    course_code: "R29",
    reference:
      "https://www.rp.edu.sg/SAS/full-time-diplomas/Details/diploma-in-environmental-science",
  },
  {
    year: 2019,
    school: "School of Applied Science",
    course_name: "Diploma in Marine Science & Aquaculture",
    course_abbreviation: "DMAC",
    course_code: "R53",
    reference:
      "https://www.rp.edu.sg/SAS/full-time-diplomas/Details/diploma-in-marine-science-and-aquaculture",
  },
  {
    year: 2019,
    school: "School of Applied Science",
    course_name: "Diploma in Materials Science",
    course_abbreviation: "DMTS",
    course_code: "R17",
    reference:
      "https://www.rp.edu.sg/SAS/full-time-diplomas/Details/diploma-in-materials-science",
  },
  {
    year: 2019,
    school: "School of Applied Science",
    course_name: "Diploma in Pharmaceutical Science",
    course_abbreviation: "DPHM",
    course_code: "R22",
    reference:
      "https://www.rp.edu.sg/SAS/full-time-diplomas/Details/diploma-in-pharmaceutical-science",
  },
  {
    year: 2019,
    school: "School of Applied Science",
    course_name: "Common Science Programme",
    course_abbreviation: "CSP",
    course_code: "R59",
    reference:
      "https://www.rp.edu.sg/SAS/full-time-diplomas/Details/common-science-programme",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Diploma in Aerospace Engineering",
    course_abbreviation: "DAE",
    course_code: "R40",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/diploma-in-aerospace-engineering",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Diploma in Aviation Management",
    course_abbreviation: "DAVM",
    course_code: "R39",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/diploma-in-aviation-management",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Diploma in Engineering Design with Business",
    course_abbreviation: "DEDB",
    course_code: "R56",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/diploma-in-engineering-design-with-business",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Diploma in Electrical & Electronic Engineering",
    course_abbreviation: "DEEE",
    course_code: "R50",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/diploma-in-electrical-and-electronic-engineering",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Diploma in Engineering Systems & Management",
    course_abbreviation: "DESM",
    course_code: "R54",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/diploma-in-engineering-systems-and-management",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Diploma in Green Building Energy Management",
    course_abbreviation: "DGEM",
    course_code: "R41",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/diploma-in-green-building-energy-management",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Diploma in Supply Chain Management",
    course_abbreviation: "DSCM",
    course_code: "R21",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/diploma-in-supply-chain-management",
  },
  {
    year: 2019,
    school: "School of Engineering",
    course_name: "Common Engineering Programme",
    course_abbreviation: "CEP",
    course_code: "R42",
    reference:
      "https://www.rp.edu.sg/SEG/full-time-diplomas/Details/common-engineering-programme",
  },
  {
    year: 2019,
    school: "School of Hospitality",
    course_name: "Diploma in Integrated Events Management",
    course_abbreviation: "DIEM",
    course_code: "R28",
    reference:
      "https://www.rp.edu.sg/Soh/full-time-diplomas/Details/diploma-in-integrated-events-management",
  },
  {
    year: 2019,
    school: "School of Hospitality",
    course_name: "Diploma in Customer Experience Management with Business",
    course_abbreviation: "DCXB",
    course_code: "R34",
    reference:
      "https://www.rp.edu.sg/SOH/full-time-diplomas/Details/diploma-in-customer-experience-management-with-business",
  },
  {
    year: 2019,
    school: "School of Hospitality",
    course_name: "Diploma in Hotel & Hospitality Management",
    course_abbreviation: "DHHM",
    course_code: "R37",
    reference:
      "https://www.rp.edu.sg/Soh/full-time-diplomas/Details/diploma-in-hotel-and-hospitality-management",
  },
  {
    year: 2019,
    school: "School of Hospitality",
    course_name: "Diploma in Restaurant & Culinary Operations",
    course_abbreviation: "DRCO",
    course_code: "R46",
    reference:
      "https://www.rp.edu.sg/soh/full-time-diplomas/Details/diploma-in-restaurant-and-culinary-operations",
  },
  {
    year: 2019,
    school: "School of Hospitality",
    course_name: "Diploma in Wellness & Hospitality Business",
    course_abbreviation: "DWHB",
    course_code: "R44",
    reference:
      "https://www.rp.edu.sg/Soh/full-time-diplomas/Details/diploma-in-wellness-and-hospitality-business",
  },
  {
    year: 2019,
    school: "School of InfoComm",
    course_name: "Diploma in Financial Technology",
    course_abbreviation: "DFT",
    course_code: "R18",
    reference:
      "https://www.rp.edu.sg/SOI/full-time-diplomas/Details/diploma-in-financial-technology",
  },
  {
    year: 2019,
    school: "School of InfoComm",
    course_name: "Diploma in Business Information Systems",
    course_abbreviation: "DBIS",
    course_code: "R13",
    reference:
      "https://www.rp.edu.sg/SOI/full-time-diplomas/Details/diploma-in-business-information-systems",
  },
  {
    year: 2019,
    school: "School of InfoComm",
    course_name: "Diploma in Information Technology",
    course_abbreviation: "DIT",
    course_code: "R12",
    reference:
      "https://www.rp.edu.sg/SOI/full-time-diplomas/Details/diploma-in-information-technology",
  },
  {
    year: 2019,
    school: "School of InfoComm",
    course_name: "Diploma in Digital Design & Development",
    course_abbreviation: "DDDD",
    course_code: "R47",
    reference:
      "https://www.rp.edu.sg/SOI/full-time-diplomas/Details/diploma-in-digital-design-and-development",
  },
  {
    year: 2019,
    school: "School of InfoComm",
    course_name: "Diploma in Infocomm Security Management",
    course_abbreviation: "DISM",
    course_code: "R55",
    reference:
      "https://www.rp.edu.sg/SOI/full-time-diplomas/Details/diploma-in-infocomm-security-management",
  },
  {
    year: 2019,
    school: "School of Management and Communication",
    course_name: "Diploma in Consumer Behaviour & Research",
    course_abbreviation: "DCBR",
    course_code: "R48",
    reference:
      "https://www.rp.edu.sg/SMC/full-time-diplomas/Details/diploma-in-consumer-behaviour-and-research",
  },
  {
    year: 2019,
    school: "School of Management and Communication",
    course_name: "Diploma in Human Resource Management with Psychology",
    course_abbreviation: "DHRMP",
    course_code: "R52",
    reference:
      "https://www.rp.edu.sg/SMC/full-time-diplomas/Details/diploma-in-human-resource-management-with-psychology",
  },
  {
    year: 2019,
    school: "School of Management and Communication",
    course_name: "Diploma in Mass Communication",
    course_abbreviation: "DMC",
    course_code: "R32",
    reference:
      "https://www.rp.edu.sg/SMC/full-time-diplomas/Details/diploma-in-mass-communication",
  },
  {
    year: 2019,
    school: "School of Management and Communication",
    course_name: "Diploma in Business",
    course_abbreviation: "DBIZ",
    course_code: "R60",
    reference:
      "https://www.rp.edu.sg/smc/full-time-diplomas/details/diploma-in-business",
  },
  {
    year: 2019,
    school: "School of Management and Communication",
    course_name: "Common Business Programme",
    course_abbreviation: "CBP",
    course_code: "R57",
    reference:
      "https://www.rp.edu.sg/SMC/full-time-diplomas/Details/common-business-programme",
  },
  {
    year: 2019,
    school: "School of Sports, Health and Leisure",
    course_name: "Diploma in Health Management & Promotion",
    course_abbreviation: "DHMP",
    course_code: "R43",
    reference:
      "https://www.rp.edu.sg/Shl/full-time-diplomas/Details/diploma-in-health-management-and-promotion",
  },
  {
    year: 2019,
    school: "School of Sports, Health and Leisure",
    course_name: "Diploma in Health Services Management",
    course_abbreviation: "DHSM",
    course_code: "R45",
    reference:
      "https://www.rp.edu.sg/Shl/full-time-diplomas/Details/diploma-in-health-services-management",
  },
  {
    year: 2019,
    school: "School of Sports, Health and Leisure",
    course_name: "Diploma in Outdoor & Adventure Learning",
    course_abbreviation: "DOAL",
    course_code: "R33",
    reference:
      "https://www.rp.edu.sg/Shl/full-time-diplomas/Details/diploma-in-outdoor-and-adventure-learning",
  },
  {
    year: 2019,
    school: "School of Sports, Health and Leisure",
    course_name: "Diploma in Sport Coaching",
    course_abbreviation: "DSC",
    course_code: "R49",
    reference:
      "https://www.rp.edu.sg/Shl/full-time-diplomas/Details/diploma-in-sport-coaching",
  },
  {
    year: 2019,
    school: "School of Sports, Health and Leisure",
    course_name: "Diploma in Sport & Exercise Science",
    course_abbreviation: "DSES",
    course_code: "R26",
    reference:
      "https://www.rp.edu.sg/Shl/full-time-diplomas/Details/diploma-in-sport-and-exercise-science",
  },
  {
    year: 2019,
    school: "School of Technology for the Arts",
    course_name: "Diploma in Design for User Experience",
    course_abbreviation: "DDUX",
    course_code: "R36",
    reference:
      "https://www.rp.edu.sg/STA/full-time-diplomas/Details/diploma-in-design-for-user-experience",
  },
  {
    year: 2019,
    school: "School of Technology for the Arts",
    course_name: "Diploma in Game Design",
    course_abbreviation: "DGD",
    course_code: "R35",
    reference:
      "https://www.rp.edu.sg/STA/full-time-diplomas/Details/diploma-in-game-design",
  },
  {
    year: 2019,
    school: "School of Technology for the Arts",
    course_name: "Diploma in Media Production & Design",
    course_abbreviation: "DMPD",
    course_code: "R19",
    reference:
      "https://www.rp.edu.sg/STA/full-time-diplomas/Details/diploma-in-media-production-and-design",
  },
  {
    year: 2019,
    school: "School of Technology for the Arts",
    course_name: "Diploma in Sonic Arts",
    course_abbreviation: "DSA",
    course_code: "R24",
    reference:
      "https://www.rp.edu.sg/STA/full-time-diplomas/Details/diploma-in-sonic-arts",
  },
  {
    year: 2019,
    school: "School of Technology for the Arts",
    course_name: "Diploma in Arts & Theatre Management",
    course_abbreviation: "DATM",
    course_code: "R25",
    reference:
      "https://www.rp.edu.sg/STA/full-time-diplomas/Details/diploma-in-arts-and-theatre-management",
  },
];

let COURSE_RP = RAW_COURSE_RP.filter(
  (rec) => rec.course_name.includes("Common") == false,
).map((rec) => ({
  id: rec.course_code,
  name: rec.course_name,
  polytechnicId: "rp",
}));
