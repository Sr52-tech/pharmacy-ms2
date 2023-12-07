import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';

export const Products = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>
            {products.map((product) => (
                <Card
                    key={product.id}
                    sx={{
                        maxWidth: 345,
                        flex: '1 0 30%', // Set the flex basis to 33.33% to display 3 cards on each row
                        margin: '20px', // Add some margin between the cards
                    }}
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.ProductImage}
                            alt={product.ProductImage}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.ProductName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {`$${product.ProductPrice}`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <Button size="small" color="primary" variant="contained">
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};
