import { useState, useEffect } from 'react';
import { Box, Divider, List, ListItemAvatar, ListItemButton, ListItemText, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import palette from '@/theme/palette';
import { useRouter } from 'next/router';
import ListItem from '@mui/material/ListItem';

const settings = ['Profile', 'Change Password', 'Logout'];

function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const router = useRouter();
  const routePath = router.pathname.split('/')[1];
  let pageTitle = '';
  switch (routePath) {
    case 'project':
      pageTitle = 'Projects';
      break;
    case 'employee':
      pageTitle = 'Employees';
      break;
    case 'task':
      pageTitle = 'Tasks';
      break;
    case 'report':
      pageTitle = 'Reports';
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: { xs: 'none', md: 'flex', gap: 15 },
        mt: 3,
        mb: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h2" sx={{ color: palette.text.primary }}>
          {pageTitle}
        </Typography>
      </Box>
      <Box sx={{ width: 'max-content', display: 'flex', gap: 3 }}>
        {/* notification item */}
        <Box>
          <IconButton aria-label={notificationsLabel(100)}>
            <Badge badgeContent={100} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box
            sx={{
              width: '100%',
              height: 400,
              maxWidth: 360,
              bgcolor: palette.common.white,
              borderRadius: '.75rem',
            }}
          >
            <List component="nav">
              <ListItem alignItems="flex-start">
                <ListItemButton>
                  <Typography sx={{ color: palette.text.primary, fontSize: '0.75rem' }}>
                    2 days ago
                  </Typography>

                  <ListItemAvatar>
                    <Avatar
                      alt="profile pics"
                      src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ alignItems: 'center' }}
                    primary={
                      <Typography sx={{ color: palette.text.primary, fontWeight: '600' }}>Reports</Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        {/* profile item */}
        <Box>
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="profile picture"
                src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
