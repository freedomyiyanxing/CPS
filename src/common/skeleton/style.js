const homeSkeletonStyle = theme => ({
  header: {
    width: '100%',
    height: 110,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 35]],
    background: theme.palette.primary[50],
    '& > span': {
      marginRight: 20,
    },
  },
  headerItems: {
    width: 100,
    height: 20,
    borderRadius: 8,
    background: theme.palette.primary[300],
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: theme.palette.primary[300],
  },

  center: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    background: theme.palette.primary[50],
  },
  centerHeader: {
    display: 'flex',
  },
  centerItemData: {
    width: 300,
    height: 40,
    borderRadius: 8,
    background: theme.palette.primary[300],
  },
  centerTab: {
    display: 'flex',
    margin: [[10, 0]],
  },
  centerTabItem: {
    width: 300,
    height: 80,
    marginRight: 4,
    background: theme.palette.primary[300],
  },
  centerGraphics: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 400,
    '& > span': {
      width: 30,
      marginRight: 16,
      background: theme.palette.primary[300],
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  items: {
    width: '100%',
    height: 30,
    marginBottom: 20,
    background: theme.palette.primary[300],
  },
});

const productSkeletonStyle = theme => ({
  content: {
    width: '100%',
    display: 'flex',
    flexFlow: 'wrap',
    '& > span': {
      width: '24%',
      height: 400,
      marginRight: '1%',
      marginBottom: 10,
      position: 'relative',
      background: theme.palette.primary[300],
      '&:last-child': {
        marginRight: 0,
      },
      '& > span': {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 138,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: [[10, 14]],
        background: theme.palette.primary[50],
        '& > span': {
          width: '100%',
          height: 20,
          borderRadius: 10,
          background: theme.palette.primary[300],
        },
      },
    },
  },
});

const myProductSkeleton = theme => ({
  container: {
    padding: 10,
    background: theme.palette.primary[50],
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    '& > span': {
      width: 200,
      height: 30,
      background: theme.palette.primary[300],
    },
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > span': {
      width: '100%',
      display: 'flex',
      padding: [[10, 40]],
      marginBottom: 10,
      background: theme.palette.primary[300],
    },
  },
  icon: {
    width: 80,
    height: 100,
    background: theme.palette.primary[50],
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 20,
    '& > span': {
      width: '100%',
      height: 24,
      background: theme.palette.primary[50],
    },
  },
});

const balanceSkeleton = theme => ({
  center: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    background: theme.palette.primary[50],
  },
  centerHeader: {
    display: 'flex',
  },
  centerItemData: {
    width: 300,
    height: 40,
    borderRadius: 8,
    background: theme.palette.primary[300],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  items: {
    width: '100%',
    height: 30,
    marginBottom: 20,
    background: theme.palette.primary[300],
  },
});

const basicSkeleton = theme => ({
  center: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary[50],
  },

  items: {
    width: '100%',
    height: 47,
    margin: [[16, 0, 8]],
    background: theme.palette.primary[300],
  },
});

export {
  homeSkeletonStyle,
  productSkeletonStyle,
  myProductSkeleton,
  balanceSkeleton,
  basicSkeleton,
};
