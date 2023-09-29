import React, { ReactElement, useState, useRef, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, InputAdornment, TablePagination, TextField, styled } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddNewBtn from '@/components/button/addNewBtn';
import TableBtn from '@/components/tableBtn';
import ConfirmDialog from '@/components/commonDialog';
import palette from '@/theme/palette';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import axios from 'axios';

const secondaryColor = palette.secondary.main;
const errorColor = palette.error.light;
const EditButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 13,
  padding: '3px 20px',
  border: '1px solid',
  borderRadius: '20px',
  backgroundColor: secondaryColor,
  color: palette.text.primary,
  borderColor: secondaryColor,
  marginRight: '10px',
  '&:hover': {
    backgroundColor: secondaryColor,
    borderColor: secondaryColor,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: secondaryColor,
    borderColor: secondaryColor,
  },
});

const RemoveButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 13,
  padding: '3px 20px',
  border: '1px solid',
  borderRadius: '20px',
  backgroundColor: errorColor,
  color: palette.text.primary,
  borderColor: errorColor,
  marginRight: '10px',
  '&:hover': {
    backgroundColor: errorColor,
    borderColor: errorColor,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: errorColor,
    borderColor: errorColor,
  },
});

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="150"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Data</Box>
    </StyledGridOverlay>
  );
};

const ProjectListPage = ({ projects }: any) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [IdToDelete, setIdToDelete] = useState(null);
  const [IdToEdit, setIdToEdit] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: 'displayId',
      headerName: 'ID',
      width: 80,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'projectName',
      headerName: 'Project Name',
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 240,
      disableColumnMenu: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 280,
      disableColumnMenu: true,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <EditButton onClick={() => handleEditOpenDialog(row._id)}>Edit</EditButton>
            <RemoveButton onClick={() => handleDeleteOpenDialog(row._id)}>Remove</RemoveButton>
          </>
        );
      },
    },
  ];

  const rows: any = projects?.data?.map((row: any, index: number) => ({
    _id: row._id,
    displayId: index + 1,
    projectName: row.projectName,
    language: row.language,
    description: row.description,
    startDate: dayjs(row.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(row.endDate).format('YYYY-MM-DD'),
  }));

  useEffect(() => {
    const filterRows: any = (rows: any[], searchText: string) => {
      return rows?.filter((row) => {
        const { projectName, language, description, startDate, endDate } = row;

        return (
          projectName?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          language?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          description?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          startDate?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          endDate?.toLowerCase().includes(searchText.toLowerCase().trim())
        );
      });
    };

    setFilteredRows(filterRows(rows, searchText));
  }, [searchText]);

  const handleEditProject = (id: any) => {
    setEditDialogOpen(false);
    router.push(`/project/edit/${id}`);
  };

  const handleEditOpenDialog = (id: any) => {
    setEditDialogOpen(true);
    setIdToEdit(id);
  };

  const handleDeleteOpenDialog = (id: any) => {
    setDeleteDialogOpen(true);
    setIdToDelete(id);
  };

  const handleDeleteProject = async (id: any) => {
    try {
      setFilteredRows((prevFilteredRows) => prevFilteredRows.filter((row: { _id: any }) => row._id !== id));
      setDeleteDialogOpen(false);
      await axios.delete(`http://localhost:8080/project/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
        <TextField
          name="search"
          id="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search ...."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end" onClick={() => setSearchText('')} style={{ cursor: 'pointer' }}>
                <ClearIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            '.MuiInputBase-root': {
              borderRadius: '.4rem',
            },
            '.MuiOutlinedInput-input': {
              p: '11.5px 14px',
              pl: 0,
            },
          }}
        />
        <AddNewBtn AddNewBtnText="Add New Project" path={'/project/add'} />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row._id}
        getRowHeight={() => 'auto'}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{
          backgroundColor: palette.common.white,
          borderRadius: '.7rem',
          '.MuiDataGrid-cell': { py: '20px' },
          '.MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus,.MuiDataGrid-cell:focus-within,.MuiDataGrid-columnHeader:focus-within':
            {
              outline: 'none',
            },
          '.MuiDataGrid-columnHeaders': { fontSize: '.95rem', py: '2.3rem' },
          '.MuiDataGrid-cellContent': { fontSize: '.85rem' },
          '.MuiDataGrid-footerContainer': { display: 'none' },
        }}
      />
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onClick={() => handleDeleteProject(IdToDelete)}
        status="delete"
      />
      <ConfirmDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onClick={() => handleEditProject(IdToEdit)}
        status="edit"
      />
    </Box>
  );
};

export default ProjectListPage;
ProjectListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8080/projects/list`);
  const projects = await res.json();

  return { props: { projects } };
}
